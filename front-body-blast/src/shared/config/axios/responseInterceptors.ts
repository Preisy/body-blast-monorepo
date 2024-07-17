import { AxiosError } from 'axios';
import { useUserStore, TokenService } from 'shared/api';
import { api } from '.';

export const refreshInterceptor = async (error: AxiosError) => {
  if (error.config?.url === '/auth/refresh') {
    TokenService.clearTokens();
    return error;
  }
  if (error.code === '500') return error;
  // if request fails
  // Take refresh fn
  const { refresh } = useUserStore();
  const { refreshToken, accessToken } = TokenService.getTokenPair();
  // If no token -> return error
  if (!refreshToken || !accessToken) return error;

  // if auth(401) error -> try to refresh access
  if (error.response && error.response.status === 401) {
    // request to refresh
    const newAccess = await refresh({ refreshToken, accessToken });

    // if successfully refreshed -> flush counter + save new tokens
    if (newAccess.data) {
      TokenService.setTokens(newAccess.data);
    }

    // Request after refresh. Return result
    if (error.config) return api.request(error.config);
  }
  return error;
};
