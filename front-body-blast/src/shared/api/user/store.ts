import { assign } from 'lodash';
import { defineStore } from 'pinia';
import { useSimpleStoreAction, useSingleState, useStoreAction } from 'shared/lib/utils';
import { Auth, Logout, Refresh, SignUp, User } from './types';
import { TokenService, UserService } from '.';

export const useUserStore = defineStore('me-store', () => {
  const user = ref(useSingleState<User.Get.Response>({ update: true }));
  const clear = () => (user.value = useSingleState<User.Get.Response>({ update: true }));
  const getUser = () =>
    useSimpleStoreAction({
      stateWrapper: user.value,
      serviceAction: UserService.getUser(),
    });

  const patchUser = (data: User.Patch.Dto) =>
    useStoreAction({
      state: user.value.updateState,
      serviceAction: UserService.patchUser(data),
    });

  const isAuth = () => !!TokenService.getAccessToken();
  const signUpRequest = ref<Partial<SignUp.Dto>>({});

  const logoutState = ref(useSingleState<Logout.Response>());
  const logout = () =>
    useSimpleStoreAction({
      stateWrapper: logoutState.value,
      serviceAction: UserService.logout(),
      onSuccess: () => TokenService.clearTokens(),
    });

  const loginState = ref(useSingleState<Auth.Response>());
  const login = (data: Auth.Dto) =>
    useSimpleStoreAction({
      stateWrapper: loginState.value,
      serviceAction: UserService.login(data),
      onSuccess: (res) => TokenService.setTokens(res),
    });

  const signUpState = ref(useSingleState<SignUp.Response>());
  const signUp = (data?: SignUp.Dto) =>
    useSimpleStoreAction({
      stateWrapper: signUpState.value,
      serviceAction: UserService.signUp(data ?? signUpRequest.value),
    });

  const refreshState = ref(useSingleState<Refresh.Response>());
  const refresh = (data: Refresh.Dto) =>
    useSimpleStoreAction({
      stateWrapper: refreshState.value,
      serviceAction: UserService.refresh(data),
    });

  const applyCredentials = (data: SignUp.Credentials.Dto) => assign(signUpRequest.value, data);
  const applyBodyParams = (data: SignUp.BodyParams.Dto) => assign(signUpRequest.value, data);
  const applyForbiddens = (data: SignUp.Forbiddens.Dto) => assign(signUpRequest.value, data);
  const applyMotivations = (data: SignUp.Motivations.Dto) => assign(signUpRequest.value, data);
  const applyDiseases = (data: SignUp.Diseases.Dto) => assign(signUpRequest.value, data);

  return {
    user,
    getUser,
    clear,
    patchUser,
    isAuth,
    login,
    logout,
    loginState,
    refresh,
    refreshState,
    signUp,
    signUpRequest,
    signUpState,
    applyCredentials,
    applyBodyParams,
    applyDiseases,
    applyForbiddens,
    applyMotivations,
  };
});
