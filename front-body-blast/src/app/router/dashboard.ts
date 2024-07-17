/* eslint-disable import/no-internal-modules */
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib';

export const dashboardRoutes: RouteRecordRaw = {
  path: '/home/',
  name: ENUMS.ROUTES_NAMES.HOME,
  meta: { auth: true },
  component: () => import('processes/layouts/ui/LClientDashboard.vue'),
  children: [
    {
      meta: { auth: true },
      path: '',
      component: () => import('pages/workout/ui/PWorkout.vue'),
      name: ENUMS.ROUTES_NAMES.TRAINING,
    },
    {
      meta: { auth: true },
      path: 'profile',
      component: () => import('pages/user/ui/PUserProfile.vue'),
      name: ENUMS.ROUTES_NAMES.PROFILE,
    },
    {
      meta: { auth: true },
      path: 'profile-edit',
      component: () => import('pages/user/ui/PUserProfileEdit.vue'),
      name: ENUMS.ROUTES_NAMES.PROFILE_EDIT,
    },
    {
      meta: { auth: true },
      path: 'diary',
      component: () => import('pages/diary/ui/PDiary.vue'),
      name: ENUMS.ROUTES_NAMES.DIARY,
    },
    {
      meta: { auth: true },
      path: 'nutrition',
      component: () => import('pages/nutrition/ui/PNutrition.vue'),
      name: ENUMS.ROUTES_NAMES.NUTRITION,
    },
    {
      meta: { auth: true, canWatchVideo: true },
      path: 'learning',
      component: () => import('pages/learning/ui/PLearning.vue'),
      name: ENUMS.ROUTES_NAMES.LEARNING,
    },
  ],
  redirect: { name: ENUMS.ROUTES_NAMES.TRAINING },
};
