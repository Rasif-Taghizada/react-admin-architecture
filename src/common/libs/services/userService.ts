import type { UpdateUserParams } from '../../types';
import axios from '../axiosInstance';
import { user } from '../constants';

const getUsersAllService = async () => {
  const response = await axios.get(user.all);
  return response.data;
};

const getUsersService = async (query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${user.byId}${queryString}`);
  return response.data;
};

const getUserByIdService = async (id: string) => {
  const response = await axios.get(`${user.byId}/${id}`);
  return response.data;
};

const updateUserStatusService = async (id: string, status: string) => {
  const response = await axios.patch(user.byIdAndStatus(id, status));
  return response.data;
};

const postInviteUsersService = async (data: any) => {
  const response = await axios.post(user.invite, data);
  return response.data;
};

const updateUserNotificationAccessService = async (userId: string, status: boolean) => {
  const formData = new FormData();
  formData.append('status', String(status));
  const response = await axios.patch(user.notificationAccess(userId), formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


const updateUserService = async (id: string, data: UpdateUserParams) => {
  const response = await axios.put(user.update(id), data);
  return response.data;
};

export {
  getUsersService,
  getUserByIdService,
  updateUserStatusService,
  postInviteUsersService,
  getUsersAllService,
  updateUserNotificationAccessService,
  updateUserService,
};
