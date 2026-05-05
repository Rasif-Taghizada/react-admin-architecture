import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { UserProfile } from '@/common/types';

export type UserRole = 'USER' | 'ADMIN';

export type ThemeMode = 'light' | 'dark';

interface ConfigState {
  sidebarCollapsed: boolean;
  userRole: UserRole | null;
  themeMode: ThemeMode;
}

// Role müəyyənləşdirmə funksiyası
export const determineUserRole = (user: UserProfile | null): UserRole => {
  if (!user) return 'USER';

  const { tenantId } = user;

  // tenantId null və ya boş string-dirsə → ADMIN
  if (!tenantId || tenantId.trim() === '') {
    return 'ADMIN';
  }

  // tenantId "00000000-0000-0000-0000-000000000000" formatındadırsa → ADMIN
  const emptyTenantIdPattern = /^0{8}-0{4}-0{4}-0{4}-0{12}$/;
  if (emptyTenantIdPattern.test(tenantId)) {
    return 'ADMIN';
  }

  // Digər hallarda → USER
  return 'USER';
};

const initialState: ConfigState = {
  sidebarCollapsed: localStorage.getItem('sidebarCollapsed') === 'true' || false,
  userRole: null,
  themeMode: localStorage.getItem('themeMode') === 'dark' ? 'dark' : 'light',
};

const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    setSidebarCollapsed(state, action: PayloadAction<boolean>) {
      state.sidebarCollapsed = action.payload;
      localStorage.setItem('sidebarCollapsed', String(action.payload));
    },
    toggleSidebarCollapsed(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed;
      localStorage.setItem('sidebarCollapsed', String(state.sidebarCollapsed));
    },
    setUserRole(state, action: PayloadAction<UserRole>) {
      state.userRole = action.payload;
    },
    clearUserRole(state) {
      state.userRole = null;
    },
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.themeMode = action.payload;
      localStorage.setItem('themeMode', action.payload);
    },
  },
});

export const {
  setSidebarCollapsed,
  toggleSidebarCollapsed,
  setUserRole,
  clearUserRole,
  setThemeMode,
} = configSlice.actions;

export default configSlice.reducer;
