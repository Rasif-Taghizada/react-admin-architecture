import { type PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { UserProfile } from '../../types';

export type UserRole = 'USER' | 'ADMIN';

interface ConfigState {
  sidebarCollapsed: boolean;
  userRole: UserRole | null;
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
  },
});

export const { setSidebarCollapsed, toggleSidebarCollapsed, setUserRole, clearUserRole } = configSlice.actions;

export default configSlice.reducer;
