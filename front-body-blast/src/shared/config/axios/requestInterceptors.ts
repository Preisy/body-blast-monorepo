import { InternalAxiosRequestConfig } from 'axios';
import { TokenService } from 'shared/api';

export const authInterceptor = (value: InternalAxiosRequestConfig<unknown>) => {
  const { accessToken } = TokenService.getTokenPair();
  value.headers.setAuthorization(`Bearer ${accessToken}`);
  return value;
};
