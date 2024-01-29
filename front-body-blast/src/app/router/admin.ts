import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin/',
  meta: { auth: true, admin: true },
  name: ENUMS.ROUTES_NAMES.ADMIN.BASE,
  component: () => import('processes/layouts/LAdminDashboard.vue').then((data) => data.default),
  children: [
    {
      path: '',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.HOME,
      component: () => import('pages/PAdminHome').then((data) => data.PAdminHome),
    },
    {
      path: 'prompt',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT,
      component: () => import('pages/PAdminPrompt').then((data) => data.PAdminPrompt),
    },
    {
      path: 'learning',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING,
      component: () => import('pages/PDiary.vue').then((data) => data.default),
    },
    {
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE,
          props: true,
          component: () => import('pages/PAdminUserProfile').then((data) => data.PAdminUserProfile),
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO,
          props: true,
          component: () => import('pages/PAdminUserProfileBio').then((data) => data.PAdminUserProfileBio),
        },
        {
          path: 'trainings',
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_TRAININGS,
          props: true,
          component: () => import('pages/PAdminUserWorkout').then((data) => data.PAdminUserWorkout),
        },
      ],
    },
  ],
  redirect: '/admin',
};
