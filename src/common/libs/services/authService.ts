import axios from '@/common/libs/axiosInstance';
import { auth } from '@/common/libs/constants';

const loginService = async (data: any) => {
  const response = await axios.post(auth.signIn, data);
  return response.data;
};

const logoutService = async () => {
  const response = await axios.post(auth.signOut);
  return response.data;
};

const refreshService = async (token: any) => {
  const response = await axios.put(`${auth.refreshToken}/${token}`);
  return response.data;
};

const changePasswordService = async (data: any) => {
  const response = await axios.post(auth.changePassword, data);
  return response.data;
};

const profileService = async () => {
  const response = await axios.get(auth.profile);
  return response.data;
};

export { loginService, logoutService, refreshService, changePasswordService, profileService };
