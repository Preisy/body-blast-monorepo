/* eslint-disable import/no-internal-modules */
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';
import { getUserIdFromRoute } from 'shared/lib/utils/getUserIdFromRoute';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin/',
  meta: { auth: true, admin: true },
  name: ENUMS.ROUTES_NAMES.ADMIN.BASE,
  component: () => import('processes/layouts/LAdminDashboard.vue'),
  children: [
    {
      path: '',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.HOME,
      component: () => import('pages/PAdminHome/ui/PAdminHome.vue'),
    },
    {
      path: 'prompt',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT,
      component: () => import('pages/PAdminPrompt/ui/PAdminPrompt.vue'),
    },
    {
      path: 'learning',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING,
      component: () => import('pages/PLearning/ui/PLearning.vue'),
    },
    {
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE,
          props: getUserIdFromRoute,
          component: () => import('pages/PAdminUserProfile/ui/PAdminUserProfile.vue'),
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO,
          props: getUserIdFromRoute,
          component: () => import('pages/PAdminUserProfileBio/ui/PAdminUserProfileBio.vue'),
        },
        {
          path: 'trainings',
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_TRAININGS,
          props: true,
          component: () => import('pages/PAdminUserWorkout/ui/PAdminUserWorkout.vue'),
        },
        {
          path: 'diary',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY,
          props: getUserIdFromRoute,
          component: () => import('pages/PAdminDiary/ui/PAdminDiary.vue'),
        },
      ],
    },
  ],
  redirect: '/admin',
};
