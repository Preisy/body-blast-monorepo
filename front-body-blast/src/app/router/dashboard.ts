import { RouteRecordRaw } from 'vue-router';
import LClientDashboardVue from 'processes/layouts/LClientDashboard.vue';
import PDiaryVue from 'pages/PDiary.vue';
import { PDiet } from 'pages/PDiet';
import { PLearning } from 'pages/PLearning';
import { PProfile } from 'pages/PProfile';
import { PTraining } from 'pages/PTraining';
import { ENUMS } from 'shared/lib/enums';

export const dashboardRoutes: RouteRecordRaw = {
  path: '/home/',
  name: ENUMS.ROUTES_NAMES.HOME,
  meta: { auth: true },
  component: LClientDashboardVue,
  children: [
    {
      meta: { auth: true },
      path: '',
      component: PTraining,
      name: ENUMS.ROUTES_NAMES.TRAINING,
    },
    {
      meta: { auth: true },
      path: 'profile',
      component: PProfile,
      name: ENUMS.ROUTES_NAMES.PROFILE,
    },
    {
      meta: { auth: true },
      path: 'diary',
      component: PDiaryVue,
      name: ENUMS.ROUTES_NAMES.DIARY,
    },
    {
      meta: { auth: true },
      path: 'diet',
      component: PDiet,
      name: ENUMS.ROUTES_NAMES.DIET,
    },
    {
      meta: { auth: true, canWatchVideo: true },
      path: 'learning',
      component: PLearning,
      name: ENUMS.ROUTES_NAMES.LEARNING,
    },
  ],
  redirect: { name: ENUMS.ROUTES_NAMES.TRAINING },
};
