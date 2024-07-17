import { Cookies } from 'quasar';

const Keys = {
  access: 'access_token',
  refresh: 'refresh_token',
};

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

//TODO: maybe move into store.ts
export const TokenService = {
  getAccessToken: () => Cookies.get(Keys.access),
  getRefreshToken: () => Cookies.get(Keys.refresh),
  getTokenPair: (): Partial<TokenPair> => ({
    accessToken: TokenService.getAccessToken() ?? undefined,
    refreshToken: TokenService.getRefreshToken() ?? undefined,
  }),
  setAccessToken: (accessToken: string) => Cookies.set(Keys.access, accessToken, { sameSite: 'Strict', path: '/' }),
  setRefreshToken: (refreshToken: string) => Cookies.set(Keys.refresh, refreshToken, { sameSite: 'Strict', path: '/' }),
  setTokens: (tokenPair: TokenPair) => {
    TokenService.setAccessToken(tokenPair.accessToken);
    TokenService.setRefreshToken(tokenPair.refreshToken);
  },
  clearTokens: () => {
    Cookies.remove(Keys.access);
    Cookies.remove(Keys.refresh);
    TokenService.setTokens({ accessToken: '', refreshToken: '' });
  },
};
