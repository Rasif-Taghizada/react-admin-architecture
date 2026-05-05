import axios from 'axios';
import { store } from '@/common/store';
import { logout as logoutAction } from '@/common/store/slices/authSlices';
import { v4 as uuidv4 } from 'uuid';
import { openNotification } from '@/common/components/shared/notification';
import { getErrorMessage } from '@/common/utils/helper/error';
import { refreshService } from '@/common/libs/services/authService';

const baseURL = import.meta.env.VITE_BASE_URL;

// Create a new Axios instance with default configurations
const instance = axios.create({
  baseURL: baseURL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add the authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    config.headers['X-TRACE-ID'] = uuidv4();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling token refresh
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url !== '/auth/signin') {
      originalRequest._retry = true; // Mark it so that we don't get into an infinite loop

      try {
        // Attempt to get a new access token using the refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await refreshService(refreshToken);
        console.log('refresh token axiosinstance', response);
        const { accessToken } = response;

        // Store the new token and update the original request headers
        localStorage.setItem('access_token', accessToken);
        originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

        // Retry the original request with the new token
        return instance(originalRequest);
      } catch (refreshError) {
        // Redirect to login if refresh token is invalid
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        //window.location.href = "/auth/signin";
        store.dispatch(logoutAction());
        return Promise.reject(refreshError);
      }
    }

    // Extract error message using helper function
    const { title, content } = getErrorMessage(error);

    // Show notification
    openNotification({
      type: 'error',
      title,
      content,
    });

    return Promise.reject(error);
  }
);

export default instance;
