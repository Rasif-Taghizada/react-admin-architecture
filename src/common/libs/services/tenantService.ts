import axios from '../axiosInstance';
import { tenants } from '../constants';


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
