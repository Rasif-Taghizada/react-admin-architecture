import type { UploadFile } from 'antd/es/upload/interface';

interface SiderBarProps {
  collapsed: boolean;
}

interface HeaderProps extends SiderBarProps {
  setCollapsed: (collapsed: boolean) => void;
}

interface PaginationListProps {
  currentPage: number;
  pageSize: number;
  total: number;
  handlePageChange: (page: number, pageSize: number) => void;
}

//auth types start

interface UserProfile {
  id: string;
  tenantId: string;
  tenantName: string | null;
  branchName: string | null;
  role: number;
  roleName: string | null;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  isActive: boolean;
  creationAt: string;
  notificationsEnabled?: boolean;
}

interface AuthState {
  user: UserProfile | null;
  isLoading: boolean;
  access_token: string | null;
  refresh_token: string | null;
  error: string | null;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginData {
  userName: string;
  password: string;
}
//auth types end

//notification
interface NotificationOptions {
  type: 'success' | 'error' | 'info' | 'warning';
  width?: number;
  title: string;
  content: string;
}

//table
interface PaginationListProps {
  currentPage: number;
  pageSize: number;
  pagination: boolean;
  total: number;
  handlePageChange: (page: number, pageSize: number) => void;
  rowSelection?: any;
  rowKey?: string | ((record: any) => React.Key);
}

interface TableProps extends PaginationListProps {
  columns: any[];
  loading?: boolean;
  data: any[];
}

type SelectionBarAction =
  | 'clear'
  | 'view'
  | 'restore'
  | 'archive'
  | 'unarchive'
  | 'delete'
  | 'download'
  | 'copy-link'
  | 'share'
  | 'move'
  | 'toggle-select-all';

interface SelectionBarProps {
  selectedCount: number;
  totalCount: number;
  onAction: (action: SelectionBarAction, payload?: { checked?: boolean }) => void;
}

//filter types
interface TableFilterProps {
  searchText: string;
  onSearchChange: (value: string) => void;
  statusFilter: number | undefined;
  onStatusChange: (value: number | undefined) => void;
  pageActive?: boolean;
}

type DocumentCreateValues = {
  name: string;
  description?: string;
  content?: string;
  file?: UploadFile[];
  ownerUserId?: string;
  folderId?: string | null;
};

type QrPostPayload = {
  channel: 'telegram' | 'whatsapp';
  event: 'download' | 'scan';
};

type FolderCreateData = {
  name: string;
  description?: string;
  parentId?: string | null;
};

type FolderUpdateData = {
  id: string;
  name: string;
  description?: string;
  parentId?: string | null;
};

type FolderGetAllParams = {
  isArchived?: boolean;
  isDeleted?: boolean;
};

 type UpdateUserParams = {
  tenantId?: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  emailAddress?: string;
  role?: number;
};

export type {
  SiderBarProps,
  HeaderProps,
  PaginationListProps,
  NotificationOptions,
  AuthState,
  UserProfile,
  LoginResponse,
  LoginData,
  TableProps,
  SelectionBarProps,
  SelectionBarAction,
  TableFilterProps,
  DocumentCreateValues,
  QrPostPayload,
  FolderCreateData,
  FolderUpdateData,
  FolderGetAllParams,
  UpdateUserParams,
};
