import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useUserStore } from 'shared/api';
import { ENUMS, useLoading } from 'shared/lib';
import { checkAdminPermissions, checkWatchVideoPermissions } from './permissions';
import routes from './routes';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    // Access to login is always available
    // Also is workaround for infinite redirect issue

    if (to.name === ENUMS.ROUTES_NAMES.LOGIN || to.name === ENUMS.ROUTES_NAMES.REGISTER) return;

    const { user, getUser } = useUserStore();
    if (!user.data?.data) {
      useLoading(user);
      await getUser();
    }

    if (user.state.isError() || !user.data) {
      // if can't get data about self, then need to relogin
      return {
        path: ENUMS.ROUTES_NAMES.LOGIN,
      };
    }

    const adminCheckResult = checkAdminPermissions(to, user.data.data);
    if (adminCheckResult) return adminCheckResult;

    const videoCheckResult = checkWatchVideoPermissions(to, user.data.data);
    if (videoCheckResult) return videoCheckResult;

    return;
  });

  return Router;
});
