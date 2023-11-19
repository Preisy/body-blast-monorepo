import { RouteRecordRaw } from 'vue-router';
import LAdminDashboardVue from 'processes/layouts/LAdminDashboard.vue';
import { PAdminDetailed } from 'pages/PAdminDetailed';
import { PAdminDetailedBio } from 'pages/PAdminDetailedBio';
import { PAdminDetailedNutrition } from 'pages/PAdminDetailedNutrition';
import { PAdminDetailedTrainings } from 'pages/PAdminDetailedTrainings';
import { PAdminProfile } from 'pages/PAdminProfile';
import { PAdminPrompt } from 'pages/PAdminPrompt';
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
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED,
          component: PAdminDetailed,
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED_BIO,
          component: PAdminDetailedBio,
        },
        {
          path: 'trainings',
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED_TRAININGS,
          component: PAdminDetailedTrainings,
        },
        {
          path: 'nutrition',
          name: ENUMS.ROUTES_NAMES.ADMIN_DETAILED_NUTRITION,
          component: PAdminDetailedNutrition,
        },
      ],
    },
  ],
  redirect: '/admin',
};
