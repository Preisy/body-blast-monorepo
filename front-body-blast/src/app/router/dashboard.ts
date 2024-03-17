/* eslint-disable import/no-internal-modules */
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';

export const dashboardRoutes: RouteRecordRaw = {
  path: '/home/',
  name: ENUMS.ROUTES_NAMES.HOME,
  meta: { auth: true },
  component: () => import('processes/layouts/LClientDashboard.vue'),
  children: [
    {
      meta: { auth: true },
      path: '',
      component: () => import('pages/PTraining/ui/PTraining.vue'),
      name: ENUMS.ROUTES_NAMES.TRAINING,
    },
    {
      meta: { auth: true },
      path: 'profile',
      component: () => import('pages/PProfile/ui/PProfile.vue'),
      name: ENUMS.ROUTES_NAMES.PROFILE,
    },
    {
      meta: { auth: true },
      path: 'profile-edit',
      component: () => import('pages/PProfileEdit/ui/PProfileEdit.vue'),
      name: ENUMS.ROUTES_NAMES.PROFILE_EDIT,
    },
    {
      meta: { auth: true },
      path: 'diary',
      component: () => import('pages/PDiary/ui/PDiary.vue'),
      name: ENUMS.ROUTES_NAMES.DIARY,
    },
    {
      meta: { auth: true },
      path: 'diet',
      component: () => import('pages/PDiet/ui/PDiet.vue'),
      name: ENUMS.ROUTES_NAMES.DIET,
    },
    {
      meta: { auth: true, canWatchVideo: true },
      path: 'learning',
      component: () => import('pages/PLearning/ui/PLearning.vue'),
      name: ENUMS.ROUTES_NAMES.LEARNING,
    },
  ],
  redirect: { name: ENUMS.ROUTES_NAMES.TRAINING },
};
