import { route } from 'quasar/wrappers';
import { createMemoryHistory, createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useAuthStore } from 'shared/api/auth';
import { useMeStore } from 'shared/api/me';
import { ENUMS } from 'shared/lib/enums';
import { useLoading } from 'shared/lib/loading';
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
    const { isAuth } = useAuthStore();

    //if requires login and no auth - return to login page
    if (to.meta.auth && !isAuth()) {
      return {
        path: ENUMS.ROUTES_NAMES.LOGIN,
      };
    }
    if (!to.meta.auth) return;

    const { me, getMe } = useMeStore();
    useLoading(me);
    await getMe();
    const role = me.data?.data.role;
    //if page available to admin, but user not admin - return to home
    if (to.meta.admin && role !== 'admin') {
      return {
        path: ENUMS.ROUTES_NAMES.HOME,
      };
    }

    //if authed and role==admin - reroute on admin page
    if (!to.meta.admin && role === 'admin' && isAuth()) return { path: ENUMS.ROUTES_NAMES.ADMIN.BASE };

    return;
  });

  return Router;
});
