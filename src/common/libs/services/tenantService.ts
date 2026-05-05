import axios from '@/common/libs/axiosInstance';
import { tenants } from '@/common/libs/constants';


const getTenantsService = async (query_params = {}) => {
  const params = new URLSearchParams(query_params).toString();
  const queryString = params ? `?${params}` : "";
  const response = await axios.get(`${tenants.all}${queryString}`);
  return response.data;
};

const getTenantsByIdService = async (id: any) => {
  const response = await axios.get(`${tenants.byId(id)}`);
  return response.data;
}

export {getTenantsService, getTenantsByIdService };
