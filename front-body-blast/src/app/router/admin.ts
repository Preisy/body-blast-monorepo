/* eslint-disable import/no-internal-modules */
import { Loading } from 'quasar';
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';

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
      component: () => import('pages/admin/home/ui/PAdminHome.vue'),
    },
    {
      path: 'prompt',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT,
      component: () => import('pages/admin/prompt/ui/PAdminPrompt.vue'),
    },
    {
      path: 'learning',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING,
      component: () => import('pages/admin/learning/ui/PAdminVideo.vue'),
    },
    {
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE,
          props: true,
          component: () => import('pages/admin/user-profile/ui/PAdminUserProfile.vue'),
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO,
          props: true,
          component: () => import('pages/admin/user-profile/ui/PAdminUserProfileBio.vue'),
        },
        {
          path: 'trainings',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_TRAININGS,
          props: true,
          component: () => {
            Loading.show();
            return import('pages/admin/workout/ui/PAdminUserWorkout.vue');
          },
        },
        {
          path: 'nutrition',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_NUTRITION,
          props: true,
          component: () => import('pages/admin/nutrition/ui/PAdminUserProfileNutrition.vue'),
        },
        {
          path: 'diary',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY,
          props: true,
          component: () => import('pages/admin/diary/ui/PAdminDiary.vue'),
        },
      ],
    },
  ],
  redirect: '/admin',
};
