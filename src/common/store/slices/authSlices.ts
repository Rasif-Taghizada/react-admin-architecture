import { type PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { loginService, profileService } from '../../libs/services/authService';
import type { AuthState, LoginData, LoginResponse, UserProfile } from '../../types';
import { determineUserRole, setUserRole } from './configSlice';
import type { AppDispatch } from '../index';

const initialState: AuthState = {
  user: null,
  isLoading: false,
  access_token: localStorage.getItem('access_token'),
  refresh_token: localStorage.getItem('refresh_token'),
  error: null,
};

// Login thunk
export const login = createAsyncThunk<LoginResponse, LoginData, { rejectValue: string }>(
  'auth/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await loginService(data);
      const { accessToken, refreshToken } = response;
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);

      return { accessToken, refreshToken };
    } catch (error: any) {
      console.log(error, 'error login');
      return rejectWithValue(error.response?.data[0]?.errorMessage || 'Login failed');
    }
  }
);

// Get Profile thunk
export const getProfile = createAsyncThunk<UserProfile, void, { rejectValue: string; dispatch: AppDispatch }>(
  'auth/getProfile',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await profileService();
      // Role-u müəyyənləşdir və config slice-a yaz
      const userRole = determineUserRole(response);
      dispatch(setUserRole(userRole));
      return response;
    } catch (error: any) {
      console.log(error, 'error getting profile');
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch profile');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      state.user = null;
      state.access_token = null;
      state.refresh_token = null;
      state.isLoading = false;
      state.error = null;
    },
    clearError(state) {
      state.error = null;
    },
    setUser(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
      // Role-u müəyyənləşdir və config slice-a yaz
      // Bu reducer-dan dispatch edə bilmərik, ona görə thunk istifadə etmək lazımdır
    },
    updateNotificationAccess(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.notificationsEnabled = action.payload;
      }
    },
    updateUser(state, action: PayloadAction<Partial<UserProfile>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<LoginResponse>) => {
        state.access_token = action.payload.accessToken;
        state.refresh_token = action.payload.refreshToken;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Login failed';
        state.isLoading = false;
      })
      // Get Profile cases
      .addCase(getProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action: PayloadAction<UserProfile>) => {
        state.user = action.payload;
        state.isLoading = false;
        // Role-u müəyyənləşdir və config slice-a yaz (thunk-da artıq edilir)
      })
      .addCase(getProfile.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Failed to fetch profile';
        state.isLoading = false;
      });
  },
});

export const { logout, clearError, setUser, updateNotificationAccess, updateUser } = authSlice.actions;

export default authSlice.reducer;
