import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';
import { adminRoutes } from './admin';
import { dashboardRoutes } from './dashboard';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('processes/layouts/LAuth.vue').then((data) => data.default),
    name: ENUMS.ROUTES_NAMES.AUTH,
    children: [
      {
        path: 'register',
        component: () => import('pages/PRegister').then((data) => data.PRegister),
        name: ENUMS.ROUTES_NAMES.REGISTER,
        meta: { transition: 'slide-left' },
      },
      {
        path: 'login',
        component: () => import('pages/PLogin').then((data) => data.PLogin),
        name: ENUMS.ROUTES_NAMES.LOGIN,
        meta: { transition: 'slide-right' },
      },
    ],
    redirect: { name: ENUMS.ROUTES_NAMES.LOGIN },
  },

  {
    path: '/404',
    component: () => import('pages/PNotFound').then((data) => data.PNotFound),
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
