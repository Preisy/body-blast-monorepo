import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';

export const dashboardRoutes: RouteRecordRaw = {
  path: '/home/',
  name: ENUMS.ROUTES_NAMES.HOME,
  meta: { auth: true },
  component: () => import('processes/layouts/LClientDashboard.vue').then((data) => data.default),
  children: [
    {
      meta: { auth: true },
      path: '',
      component: () => import('pages/PTraining').then((data) => data.PTraining),
      name: ENUMS.ROUTES_NAMES.TRAINING,
    },
    {
      meta: { auth: true },
      path: 'profile',
      component: () => import('pages/PProfile').then((data) => data.PProfile),
      name: ENUMS.ROUTES_NAMES.PROFILE,
    },
    {
      meta: { auth: true },
      path: 'diary',
      component: () => import('pages/PDiary.vue').then((data) => data.default),
      name: ENUMS.ROUTES_NAMES.DIARY,
    },
    {
      meta: { auth: true },
      path: 'diet',
      component: () => import('pages/PDiet.vue').then((data) => data.default),
      name: ENUMS.ROUTES_NAMES.DIET,
    },
    {
      meta: { auth: true },
      path: 'learning',
      component: () => import('pages/PLearning.vue').then((data) => data.default),
      name: ENUMS.ROUTES_NAMES.LEARNING,
    },
  ],
  redirect: { name: ENUMS.ROUTES_NAMES.TRAINING },
};
