import { InternalAxiosRequestConfig } from 'axios';
import { TokenService } from 'shared/api/auth';

export const authInterceptor = (value: InternalAxiosRequestConfig<unknown>) => {
  const { accessToken } = TokenService.getTokenPair();
  value.headers.setAuthorization(`Bearer ${accessToken}`);
  return value;
};
