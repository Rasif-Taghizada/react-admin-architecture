import axios from '@/common/libs/axiosInstance';
import { folder } from '@/common/libs/constants';
import type { FolderCreateData, FolderUpdateData, FolderGetAllParams } from '@/common/types';

const postFolderService = async (data: FolderCreateData) => {
  const response = await axios.post(folder.base, data);
  return response.data;
};

const putFolderService = async (data: FolderUpdateData) => {
  const response = await axios.put(folder.base, data);
  return response.data;
};

const getFolderPagedService = async (query_params: FolderGetAllParams = {}) => {
  const params = new URLSearchParams();
  if (query_params.isArchived !== undefined) {
    params.append('isArchived', String(query_params.isArchived));
  }
  if (query_params.isDeleted !== undefined) {
    params.append('isDeleted', String(query_params.isDeleted));
  }
  const queryString = params.toString() ? `?${params.toString()}` : '';
  const response = await axios.get(`${folder.base}${queryString}`);
  return response.data;
};

const deleteFolderBulkSoftService = async (ids: string[]) => {
  const response = await axios.delete(folder.folderBulkDelete, {
    data: ids,
  });

  return response.data;
};

const updateFolderBulkArchiveService = async (data: unknown) => {
  const response = await axios.patch(folder.folderBulkArchive, data);
  return response.data;
};

const updateFolderBulkUnArchiveService = async (data: unknown) => {
  const response = await axios.patch(folder.folderBulkUnArchive, data);
  return response.data;
};

const getFolderByIdService = async (id: string, fileType: number) => {
  const responseType = fileType === 1 || fileType === 2 ? 'json' : 'blob';
  const response = await axios.get(`${folder.base}/${id}`, {
    responseType: responseType,
  });
  return response.data;
};

const addFolderToSubfolderService = async (folderId: string, parentFolderId: string) => {
  const response = await axios.patch(`${folder.base}/${folderId}/${folder.addToSubfolder}/${parentFolderId}`);
  return response.data;
};

const removeFolderFromSubfolderService = async (folderId: string) => {
  const response = await axios.patch(`${folder.base}/${folderId}/${folder.removeFromSubfolder}`);
  return response.data;
};

const postFolderBulkRestoreService = async (data: any) => {
  const response = await axios.post(folder.folderRestore, data);
  return response.data;
};

export {
  getFolderByIdService,
  postFolderService,
  putFolderService,
  getFolderPagedService,
  deleteFolderBulkSoftService,
  updateFolderBulkArchiveService,
  updateFolderBulkUnArchiveService,
  addFolderToSubfolderService,
  removeFolderFromSubfolderService,
  postFolderBulkRestoreService,
};
