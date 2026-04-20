import axios from '../axiosInstance';
import { documentAccess, documentAccessPermissions, contentPermission } from '../constants';

const getDocumentAccessService = async (id: string) => {
  const response = await axios.get(`${documentAccess.documentShare}/${id}`);
  return response.data;
};

const getDoucmentAscessListService = async (query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${documentAccess.documentShareList}${queryString}`);
  return response.data;
};

const getDocumentAccessShareByIdService = async (id: string, query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${documentAccess.documentShare}/${id}${queryString}`);
  return response.data;
};

interface CreateDocumentAccessParams {
  documentId?: string;
  folderId?: string;
  userId: string;
  permissionId?: string | null;
}

const createDocumentAccessService = async (data: CreateDocumentAccessParams) => {
  const response = await axios.post(documentAccess.create, data);
  return response.data;
};

const deleteDocumentAccessService = async (id: string) => {
  const response = await axios.delete(documentAccess.delete(id));
  return response.data;
};

interface ContentPermissionItem {
  id: string;
  name: string;
}

const getContentPermissionsService = async (): Promise<ContentPermissionItem[]> => {
  const response = await axios.get(contentPermission.all);
  return response.data;
};

interface CreateDocumentAccessPermissionParams {
  documentAccessId: string;
  contentPermissionId: string;
}

interface BulkAssignPermissionsParams {
  documentAccessId: string;
  contentPermissionIds: string[];
}

interface DocumentAccessPermissionItem {
  id: string;
  documentAccessId: string;
  contentPermissionId: string;
}

interface GetDocumentAccessPermissionsParams {
  documentAccessId?: string;
  contentPermissionId?: string;
}

const createDocumentAccessPermissionService = async (data: CreateDocumentAccessPermissionParams) => {
  const response = await axios.post(documentAccessPermissions.create, data);
  return response.data;
};

const bulkAssignPermissionsService = async (data: BulkAssignPermissionsParams) => {
  const response = await axios.post(documentAccessPermissions.bulkAssign, data);
  return response.data;
};

const getDocumentAccessPermissionsListService = async (params: GetDocumentAccessPermissionsParams = {}): Promise<DocumentAccessPermissionItem[]> => {
  const queryParams = new URLSearchParams();
  if (params.documentAccessId) {
    queryParams.append('documentAccessId', params.documentAccessId);
  }
  if (params.contentPermissionId) {
    queryParams.append('contentPermissionId', params.contentPermissionId);
  }
  const queryString = queryParams.toString();
  const url = queryString ? `${documentAccessPermissions.getList}?${queryString}` : documentAccessPermissions.getList;
  const response = await axios.get(url);
  return response.data;
};


const getDocumentAccessArchiveListService = async (id: string,query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${documentAccess.getArchive(id)}${queryString}`);
  return response.data;
};

const getDocumentAccessDeletedListService = async (id: string,query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${documentAccess.getDeleted(id)}${queryString}`);
  return response.data;
};

export {
  getDocumentAccessService,
  getDoucmentAscessListService,
  getDocumentAccessShareByIdService,
  createDocumentAccessService,
  deleteDocumentAccessService,
  getContentPermissionsService,
  createDocumentAccessPermissionService,
  bulkAssignPermissionsService,
  getDocumentAccessPermissionsListService,
  getDocumentAccessArchiveListService,
  getDocumentAccessDeletedListService,
};

export type {
  CreateDocumentAccessParams,
  ContentPermissionItem,
  CreateDocumentAccessPermissionParams,
  BulkAssignPermissionsParams,
  DocumentAccessPermissionItem,
  GetDocumentAccessPermissionsParams,
};
