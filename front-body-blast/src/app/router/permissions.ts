import { RouteLocationNormalized } from 'vue-router';
import { User, useUserStore } from 'shared/api';
import { ENUMS } from 'shared/lib';

export function checkAdminPermissions(to: RouteLocationNormalized, me: User) {
  const { isAuth } = useUserStore();

  //if requires login and no auth - return to login page
  if (to.meta.auth && !isAuth()) {
    return {
      path: ENUMS.ROUTES_NAMES.LOGIN,
    };
  }
  if (!to.meta.auth) return;

  //if page available to admin, but user not admin - return to home
  if (to.meta.admin && me.role !== 'admin')
    return {
      path: ENUMS.ROUTES_NAMES.HOME,
    };

  //if authed and role==admin - reroute to admin page
  if (!to.meta.admin && me.role === 'admin' && isAuth())
    return {
      path: ENUMS.ROUTES_NAMES.ADMIN.BASE,
    };

  return;
}

export function checkWatchVideoPermissions(to: RouteLocationNormalized, me: User) {
  // canWatchVideo check
  if (to.meta.canWatchVideo && !me.canWatchVideo) {
    // redirect to home, if user can't watch video, but tries to access
    return { name: ENUMS.ROUTES_NAMES.HOME };
  }

  return;
}
