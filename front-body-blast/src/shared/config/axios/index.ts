import axios, { CreateAxiosDefaults, AxiosError } from 'axios';
import { authInterceptor } from './requestInterceptors';
import { refreshInterceptor } from './responseInterceptors';

export const defaultApiConfig: CreateAxiosDefaults = { timeout: 10000 };
export const api = axios.create({ baseURL: '/api/', ...defaultApiConfig });

//x-auth-token/Authorization header
api.interceptors.request.use((value) => {
  value = authInterceptor(value);
  return value;
});

//refresh request if 'accessToken' is outdated/lost
api.interceptors.response.use(
  (value) => value,
  async (error: AxiosError) => await refreshInterceptor(error), // Return error or new request
);
