import { Cookies } from 'quasar';

const Keys = {
  access: 'access_token',
  refresh: 'refresh_token',
};

interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export const TokenService = {
  getAccessToken: () => Cookies.get(Keys.access),
  getRefreshToken: () => Cookies.get(Keys.refresh),
  getTokenPair: (): DeepNullable<TokenPair> => ({
    accessToken: TokenService.getAccessToken(),
    refreshToken: TokenService.getRefreshToken(),
  }),
  // is it ok to 'path': '/' ?
  setAccessToken: (accessToken: string) => Cookies.set(Keys.access, accessToken, { sameSite: 'Strict', path: '/' }),
  setRefreshToken: (refreshToken: string) => Cookies.set(Keys.refresh, refreshToken, { sameSite: 'Strict', path: '/' }),
  setTokens: (tokenPair: TokenPair) => {
    TokenService.setAccessToken(tokenPair.accessToken);
    TokenService.setRefreshToken(tokenPair.refreshToken);
  },
  clearTokens: () => {
    Cookies.remove(Keys.access);
    Cookies.remove(Keys.refresh);
  },
};
