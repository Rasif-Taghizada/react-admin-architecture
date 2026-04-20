interface TenantData {
  id: string; // tenantId
  organization: string;
  status: 'Active' | 'Inactive' | 'Pending Activation';
  lastActivity: string;
  numberOfUsers: number;
  additionalUsers?: number;
  dateAdded: string;
}

interface ApiUser {
  id: string;
  tenantName: string | null;
  firstName: string | null;
  lastName: string | null;
  emailAddress: string;
  phoneNumber: string | null;
  roleName: string | null;
  isActive: boolean;
  creationAt: string;
  lastModifiedAt: string | null;
  avatarId: string | null;
  index?: number;
}

interface UserData {
  id: string;
  organization: string;
  status: 'Active' | 'Inactive' | 'Pending Activation';
  lastActivity: string;
  numberOfUsers: number;
  additionalUsers?: number;
  dateAdded: string;
}

interface UserDetailData {
  id: string;
  tenantId: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  isActive: boolean;
  creationAt: string;
  lastModifiedAt: string;
}

interface ActivityItem {
  id: string;
  time: string;
  description: string;
  files?: { name: string; type: 'pdf' | 'folder' }[];
}

interface Tenant {
  value: string;
  label: string;
}

interface InviteUsersModalContentProps {
  tenants?: Tenant[];
  onDone: (data: { email: string[]; tenantId: string }) => void;
}

type UsersPageHeaderProps = {
  pageActive: boolean;
  orgName: string;
  onBack?: () => void;
  onInviteClick?: () => void;
};

// share user document
type UserDocumentType = 'Document' | 'Folder';

interface UserDocumentShare {
  id: string;
  name: string;
  lastAccessedAt: string;
  type: UserDocumentType;
}

// user activity
 type UserActivityAction = 'QRCodeDownload' | 'Download' | 'View';

 interface UserActivity {
  id: string;
  createdByName: string | null;
  tenantName: string | null;
  documentId: string | null;
  folderId: string | null;
  action: UserActivityAction;
  ipAddress: string;
  userAgent: string;
  createdBy: string;
  creationAt: string;
}

export type {
  TenantData,
  ApiUser,
  UserData,
  UserDetailData,
  ActivityItem,
  Tenant,
  InviteUsersModalContentProps,
  UsersPageHeaderProps,
  UserDocumentShare,
  UserActivity,
};
