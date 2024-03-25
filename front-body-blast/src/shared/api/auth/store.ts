import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState } from 'shared/lib/utils';
import { authService } from './service';
import { TokenService } from './token';
import { Auth, SignUp, Refresh, Logout } from './types';

export const useAuthStore = defineStore('auth-store', () => {
  const isAuth = () => !!TokenService.getAccessToken();
  const signUpRequest = ref<Partial<SignUp.Dto>>({});

  const logoutState = ref(useSingleState<Logout.Response>());
  const logout = () =>
    useSimpleStoreAction({
      stateWrapper: logoutState.value,
      serviceAction: authService.logout(),
      onSuccess: () => TokenService.clearTokens(),
    });

  const loginState = ref(useSingleState<Auth.Response>());
  const login = (data: Auth.Dto) =>
    useSimpleStoreAction({
      stateWrapper: loginState.value,
      serviceAction: authService.login(data),
      onSuccess: (res) => TokenService.setTokens(res),
    });

  const signUpState = ref(useSingleState<SignUp.Response>());
  const signUp = (data?: SignUp.Dto) =>
    useSimpleStoreAction({
      stateWrapper: signUpState.value,
      serviceAction: authService.signUp(data ?? signUpRequest.value),
    });

  const refreshState = ref(useSingleState<Refresh.Response>());
  const refresh = (data: Refresh.Dto) =>
    useSimpleStoreAction({
      stateWrapper: refreshState.value,
      serviceAction: authService.refresh(data),
    });

  const applyCredentials = (data: SignUp.Credentials.Dto) => assign(signUpRequest.value, data);
  const applyBodyParams = (data: SignUp.BodyParams.Dto) => assign(signUpRequest.value, data);
  const applyForbiddens = (data: SignUp.Forbiddens.Dto) => assign(signUpRequest.value, data);
  const applyMotivations = (data: SignUp.Motivations.Dto) => assign(signUpRequest.value, data);
  const applyDiseases = (data: SignUp.Diseases.Dto) => assign(signUpRequest.value, data);

  return {
    isAuth,
    login,
    logout,
    loginState,
    refresh,
    refreshState,
    signUp,
    signUpState,
    applyCredentials,
    applyBodyParams,
    applyDiseases,
    applyForbiddens,
    applyMotivations,
    signUpRequest,
  };
});
