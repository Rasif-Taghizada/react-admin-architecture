const auth = {
  signIn: 'Account/accounts/sign-in',
  signOut: 'DeviceSessions/logout-all',
  refreshToken: 'Account/accounts/refresh-sign-in',
  changePassword: 'Account/accounts/change-password',
  profile: 'Account/accounts/profile',
};

const user = {
  all: 'User/users/all',
  byId: 'User/users',
  byIdAndStatus: (id: string, status: string) => `User/users/${id}/${status}`,
  invite: 'User/invited-users/assign-tenant',
  notificationAccess: (id: string) => `User/users/${id}/notification-access`,
  update: (id: string) => `User/users/${id}`,
};

const tenants = {
  all: 'Tenants/get-all',
  byId: (id: string) => `Tenants/${id}`,
};

const document = {
  docs: 'Documents/documents',
  docsById: 'Documents/documents',
  paged: 'Documents/documents/paged',
  downloadById: 'Documents/documents/download',
  donwloadByFolderId: 'Documents/documents/download-folder',
  view: 'Documents/documents/view',
  archiveList: 'Documents/documents/archive',
  addToFolder: 'add-to-folder',
  removeFromFolder: 'remove-from-folder',
  bulkDelete: 'Documents/documents/bulk-delete',
  bulkRestore: 'Documents/documents/bulk-restore',
  bulkArchive: 'Documents/documents/bulk-archive',
  bulkUnArchive: 'Documents/documents/bulk-unarchive',
};

const folder = {
  base: 'Folders/folders',
  addToSubfolder: 'add-to-subfolder',
  removeFromSubfolder: 'remove-from-subfolder',
  folderBulkDelete: 'Folders/folders/bulk-delete',
  folderBulkArchive: 'Folders/folders/bulk-archive',
  folderBulkUnArchive: 'Folders/folders/bulk-unarchive',
  folderRestore: 'Folders/folders/bulk-restore',
};

const documentAccess = {
  documentShare: 'DocumentAccess/document-access',
  documentShareList: 'DocumentAccess/document-access',
  create: 'DocumentAccess/document-access',
  delete: (id: string) => `DocumentAccess/document-access/${id}`,
  getArchive: (id: string) => `DocumentAccess/document-access/${id}/archive`,
  getDeleted: (id: string) => `DocumentAccess/document-access/${id}/deleted`,
};

const documentAccessPermissions = {
  create: 'DocumentAccessPermissions/document-access-permissions',
  bulkAssign: 'DocumentAccessPermissions/document-access-permissions/bulk-assign',
  getList: 'DocumentAccessPermissions/document-access-permissions',
};

const contentPermission = {
  all: 'ContentPermissions/content-permissions',
};

const notification = {
  getNotifications: 'Notifications/notifications',
  getNotificationById: (id: string) => `Notifications/notifications/${id}`,
  create: 'Notifications/notifications',
  update: (id: string) => `Notifications/notifications/${id}`,
  delete: (id: string) => `Notifications/notifications/${id}`,
  recipientCreate: 'Notifications/notification-recipients',
  recipientSend: (id: string) => `Notifications/notifications/${id}/send`,
  getUserNotifications: (userId: string) => `Notifications/notification-recipients/user/${userId}`,
  recipientRead: (notificationId: string, userId: string) =>
    `Notifications/notification-recipients/${notificationId}/users/${userId}/read`,
  recipientDeliver: (notificationId: string, userId: string) =>
    `Notifications/notification-recipients/${notificationId}/users/${userId}/deliver`,
  getRecipients: (notificationId: string) =>
    `Notifications/notification-recipients/${notificationId}/recipients`,
};

const qrCode = {
  action: 'QrCodes/qr-codes',
};

export {
  auth,
  user,
  tenants,
  document,
  folder,
  documentAccess,
  documentAccessPermissions,
  contentPermission,
  notification,
  qrCode,
};