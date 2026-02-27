import { Platform } from 'react-native';
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios';
import Routes from '@navigation/routes';
import storageHelper from '@utils/storageHelper';
import { resetAndNavigate } from '@utils/navigationUtils';

const axiosInstance = axios.create({
  baseURL: 'https://user-driven-mock-api-generator-serv.vercel.app/man',
});

const ResponseInterceptor = (response: AxiosResponse) => {
  return response;
};

const RequestInterceptor = (config: AxiosRequestConfig | any) => {
  const token = storageHelper.getItem(storageHelper.STORAGE_KEYS.AUTH_TOKEN);
  config.headers.device = Platform.OS;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

axiosInstance.interceptors.request.use(RequestInterceptor);

axiosInstance.interceptors.response.use(ResponseInterceptor, error => {
  if (error.response) {
    if (error.response.status === 403) {
      // Unauthorized
      resetAndNavigate(Routes.AuthStack);
    }
    return Promise.reject(error);
  } else if (error.request) {
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
});

export { axiosInstance };
