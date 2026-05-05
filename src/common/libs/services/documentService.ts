import type { DocumentCreateValues } from '@/common/types';
import axios from '@/common/libs/axiosInstance';
import { document } from '@/common/libs/constants';


const buildFormData = (v: DocumentCreateValues) => {
  const fd = new FormData();

  fd.append("Name", v.name);

  if (v.description) fd.append("Description", v.description);
  if (v.content) fd.append("Content", v.content);
  if (v.ownerUserId) fd.append("OwnerUserId", v.ownerUserId);
  if (v.folderId) fd.append("FolderId", v.folderId);

  const f = v.file?.[0]?.originFileObj as File | undefined;
  if (f) fd.append("File", f);

  return fd;
};
 const postDocumentService = async (values: DocumentCreateValues) => {
  const formData = buildFormData(values);

  const res = await axios.post(document.docs, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

interface DocumentUpdateValues {
  id: string;
  name?: string;
  description?: string;
  content?: string;
  folderId?: string | null;
  fileType?: number;
  isArchived?: boolean;
  attachmentId?: string | null;
  file?: File;
}

const buildUpdateFormData = (v: DocumentUpdateValues) => {
  const fd = new FormData();

  if (v.name) fd.append("Name", v.name);
  if (v.description) fd.append("Description", v.description);
  if (v.content) fd.append("Content", v.content);
  if (v.folderId) fd.append("FolderId", v.folderId);
  if (v.fileType !== undefined) fd.append("FileType", String(v.fileType));
  if (v.isArchived !== undefined) fd.append("IsArchived", String(v.isArchived));
  if (v.attachmentId) fd.append("AttachmentId", v.attachmentId);
  if (v.file) fd.append("File", v.file);

  return fd;
};

const updateDocumentService = async (id: string, values: Omit<DocumentUpdateValues, 'id'>) => {
  const formData = buildUpdateFormData({ ...values, id });

  const res = await axios.put(`${document.docsById}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

const addDocumentToFolderService = async (documentId: string, folderId: string) => {
  const response = await axios.put(`${document.docsById}/${documentId}/${document.addToFolder}/${folderId}`);
  return response.data;
};

const removeDocumentFromFolderService = async (documentId: string) => {
  const response = await axios.put(`${document.docsById}/${documentId}/${document.removeFromFolder}`);
  return response.data;
};

const getDocumentPagedService = async (query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${document.paged}${queryString}`);
  return response.data;
};

const getDocumentDownloadByIdService = async (id: string, fileType: any): Promise<Blob> => {
  const responseType = (fileType === 1 || fileType === 2) ? 'json' : 'blob';
  const response = await axios.get(`${document.downloadById}/${id}`, {
    responseType: responseType,
  });

  return response.data;
};

const getDocumentByFolderIdService = async (id: any, fileType: any) => {
  const responseType = (fileType === 1 || fileType === 2) ? 'json' : 'blob';
  const response = await axios.get(`${document.donwloadByFolderId}/${id}`, {
    responseType: responseType,
  });
  return response.data;
};

const getDocumentViewService = async (id: any, fileType: any) => {
  const responseType = (fileType === 1 || fileType === 2) ? 'json' : 'blob';
  const response = await axios.get(`${document.view}/${id}`, {
    responseType: responseType,
  });
  return response.data;
};

const getDocumentArchiveListService = async (query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${document.archiveList}${queryString}`);
  return response.data;
};

const getDocumentByIdService = async (id: any) => {
  const response = await axios.get(`${document.docsById}/${id}`);
  return response.data;
};

const deleteDocumentService = async (id: any) => {
  const response = await axios.delete(`${document.docsById}/${id}`);
  return response.data;
};

const updateOneDocumentUnArchiveService = async (id: any) => {
  const response = await axios.put(`${document.docsById}/${id}/unarchive`);
  return response.data;
};

const updateDocumentArchiveService = async (id: any) => {
  const response = await axios.put(`${document.docsById}/${id}/archive`);
  return response.data;
};

const deleteDocumentBulkSoftService = async (ids: string[]) => {
  const response = await axios.delete(document.bulkDelete, {
    data: ids,
  });

  return response.data;
};

const postDocumentBulkRestoreService = async (data: any) => {
  const response = await axios.post(document.bulkRestore, data);
  return response.data;
};

const postDocumentBulkArchiveService = async (data: any) => {
  const response = await axios.patch(document.bulkArchive, data);
  return response.data;
};

const postDocumentBulkUnArchiveService = async (data: any) => {
  const response = await axios.patch(document.bulkUnArchive, data);
  return response.data;
};

export {
  getDocumentPagedService,
  getDocumentDownloadByIdService,
  getDocumentByFolderIdService,
  getDocumentViewService,
  getDocumentArchiveListService,
  deleteDocumentService,
  deleteDocumentBulkSoftService,
  getDocumentByIdService,
  updateOneDocumentUnArchiveService,
  updateDocumentArchiveService,
  postDocumentBulkRestoreService,
  postDocumentBulkArchiveService,
  postDocumentBulkUnArchiveService,
  postDocumentService,
  updateDocumentService,
  addDocumentToFolderService,
  removeDocumentFromFolderService,
};
export type { DocumentUpdateValues };