import { RouteRecordRaw } from 'vue-router';
import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import { PAdminProfile } from 'pages/PAdminProfile';
import { PAdminPrompt } from 'pages/PAdminPrompt';
import { PAdminUserProfile } from 'pages/PAdminUserProfile';
import { PAdminUserProfileBio } from 'pages/PAdminUserProfileBio';
import { PAdminUserProfileNutrition } from 'pages/PAdminUserProfileNutrition';
import { PAdminUserProfileTrainings } from 'pages/PAdminUserProfileTrainings';
import PDiaryVue from 'pages/PDiary.vue';
import { ENUMS } from 'shared/lib/enums';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin/',
  meta: { auth: true, admin: true },
  name: ENUMS.ROUTES_NAMES.ADMIN,
  component: LAdminDashboardVue,
  children: [
    {
      path: '',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN_PROFILE,
      component: PAdminProfile,
    },
    {
      path: 'prompt',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN_PROMPT,
      component: PAdminPrompt,
    },
    {
      path: 'learning',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN_LEARNING,
      component: PDiaryVue,
    },
    {
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE,
          component: PAdminUserProfile,
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE_BIO,
          component: PAdminUserProfileBio,
        },
        {
          path: 'trainings',
          name: ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE_TRAININGS,
          component: PAdminUserProfileTrainings,
        },
        {
          path: 'nutrition',
          name: ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE_NUTRITION,
          component: PAdminUserProfileNutrition,
        },
      ],
    },
  ],
  redirect: '/admin',
};
