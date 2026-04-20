import type { QrPostPayload } from '../../types';
import axios from '../axiosInstance';
import { qrCode } from '../constants';


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
