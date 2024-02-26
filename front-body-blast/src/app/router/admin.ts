/* eslint-disable import/no-internal-modules */
import { RouteRecordRaw } from 'vue-router';
import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import { PAdminHome } from 'pages/PAdminHome';
import { PAdminPrompt } from 'pages/PAdminPrompt';
import { PAdminUserProfile } from 'pages/PAdminUserProfile';
import { PAdminUserProfileBio } from 'pages/PAdminUserProfileBio';
import { ENUMS } from 'shared/lib/enums';
import { getUserIdFromRoute } from 'shared/lib/utils/getUserIdFromRoute';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin/',
  meta: { auth: true, admin: true },
  name: ENUMS.ROUTES_NAMES.ADMIN.BASE,
  component: LAdminDashboardVue,
  children: [
    {
      path: '',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.HOME,
      component: PAdminHome,
    },
    {
      path: 'prompt',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT,
      component: PAdminPrompt,
    },
    {
      path: 'learning',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING,
      component: SNoResultsScreen,
    },
    {
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE,
          props: (route) => getUserIdFromRoute(route),
          component: PAdminUserProfile,
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO,
          props: true,
          component: PAdminUserProfileBio,
        },
        {
          path: 'diary',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY,
          props: (route) => getUserIdFromRoute(route),
          component: () => import('pages/PAdminDiary/ui/PAdminDiary.vue'),
        },
      ],
    },
  ],
  redirect: '/admin',
};
