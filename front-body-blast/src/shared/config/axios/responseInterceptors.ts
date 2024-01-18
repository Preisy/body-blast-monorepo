import { AxiosError } from 'axios';
import { useAuthStore, TokenService } from 'shared/api/auth';
import { api } from '.';

export const refreshInterceptor = async (error: AxiosError) => {
  if (error.config?.url === '/auth/refresh') return;
  // if request fails
  // Take refresh fn
  const { refresh } = useAuthStore();
  const { refreshToken, accessToken } = TokenService.getTokenPair();
  // If no token -> return error
  if (!refreshToken || !accessToken) return error;

  // if auth(401, 403) error -> try to refresh access token for N times
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    // request to refresh
    const newAccess = await refresh({ refreshToken, accessToken });

    // if successfully refreshed -> flush counter + save new tokens
    if (newAccess.data) {
      TokenService.setTokens(newAccess.data);
    }

    console.log(error.request);
    api(error.request);
  }
  return error;
};
