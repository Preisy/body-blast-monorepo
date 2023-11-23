import { AxiosError } from 'axios';
import { useAuthStore, TokenService } from 'shared/api/auth';

export const refreshInterceptor = async (error: AxiosError) => {
  // if request fails
  // Take refresh fn
  const { refresh } = useAuthStore();
  const refreshToken = TokenService.getRefreshToken();
  // If no token -> return error
  if (!refreshToken) return error;

  // if auth(401, 403) error -> try to refresh access token for N times
  if (error.response && (error.response.status === 401 || error.response.status === 403)) {
    // request to refresh
    const newAccess = await refresh({ refreshToken });

    // if successfully refreshed -> flush counter + save new tokens
    if (newAccess.data) {
      TokenService.setTokens(newAccess.data);
    }
  }
  return error;
};
