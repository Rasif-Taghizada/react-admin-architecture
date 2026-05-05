import type { QrPostPayload } from '@/common/types';
import axios from '@/common/libs/axiosInstance';
import { qrCode } from '@/common/libs/constants';


const postQRCodeService = async (payload: QrPostPayload) => {
  const response = await axios.post(qrCode.action, payload);
  return response.data;
};;

const getQRCodeService = async (query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : '';
  const response = await axios.get(`${qrCode.action}${queryString}`);
  return response.data;
};

export { postQRCodeService, getQRCodeService };
