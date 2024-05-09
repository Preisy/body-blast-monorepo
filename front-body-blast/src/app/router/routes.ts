/* eslint-disable import/no-internal-modules */
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib';
import { adminRoutes } from './admin';
import { dashboardRoutes } from './dashboard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('processes/layouts/ui/LAuth.vue'),
    name: ENUMS.ROUTES_NAMES.AUTH,
    children: [
      {
        path: 'register',
        component: () => import('pages/user/ui/PRegister.vue'),
        name: ENUMS.ROUTES_NAMES.REGISTER,
        meta: { transition: 'slide-left' },
      },
      {
        path: 'login',
        component: () => import('pages/user/ui/PLogin.vue'),
        name: ENUMS.ROUTES_NAMES.LOGIN,
        meta: { transition: 'slide-right' },
      },
    ],
    redirect: { name: ENUMS.ROUTES_NAMES.LOGIN },
  },

  {
    path: '/404',
    component: () => import('pages/not-found/ui/PNotFound.vue'),
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
