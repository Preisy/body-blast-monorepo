/* eslint-disable import/no-internal-modules */
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingImport } from 'shared/lib/loading';
import { adminRoutes } from './admin';
import { dashboardRoutes } from './dashboard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: useLoadingImport(() => import('processes/layouts/LAuth.vue')),
    name: ENUMS.ROUTES_NAMES.AUTH,
    children: [
      {
        path: 'register',
        component: useLoadingImport(() => import('pages/PRegister/ui/PRegister.vue')),
        name: ENUMS.ROUTES_NAMES.REGISTER,
        meta: { transition: 'slide-left' },
      },
      {
        path: 'login',
        component: useLoadingImport(() => import('pages/PLogin/ui/PLogin.vue')),
        name: ENUMS.ROUTES_NAMES.LOGIN,
        meta: { transition: 'slide-right' },
      },
    ],
    redirect: { name: ENUMS.ROUTES_NAMES.LOGIN },
  },

  {
    path: '/404',
    component: useLoadingImport(() => import('pages/PNotFound/ui/PNotFound.vue')),
    name: ENUMS.ROUTES_NAMES.NOT_FOUND,
  },

  adminRoutes,
  dashboardRoutes,

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    redirect: { name: ENUMS.ROUTES_NAMES.LOGIN },
  },
];

export default routes;
