/* eslint-disable import/no-internal-modules */
import { Loading } from 'quasar';
import { RouteRecordRaw } from 'vue-router';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingImport } from 'shared/lib/loading';
import { getUserIdFromRoute } from 'shared/lib/utils/getUserIdFromRoute';

export const adminRoutes: RouteRecordRaw = {
  path: '/admin/',
  meta: { auth: true, admin: true },
  name: ENUMS.ROUTES_NAMES.ADMIN.BASE,
  component: useLoadingImport(() => import('processes/layouts/LAdminDashboard.vue')),
  children: [
    {
      path: '',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.HOME,
      component: useLoadingImport(() => import('pages/PAdminHome/ui/PAdminHome.vue')),
    },
    {
      path: 'prompt',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT,
      component: useLoadingImport(() => import('pages/PAdminPrompt/ui/PAdminPrompt.vue')),
    },
    {
      path: 'learning',
      meta: { auth: true, admin: true },
      name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING,
      component: useLoadingImport(() => import('pages/PAdminVideo/ui/PAdminVideo.vue')),
    },
    {
      path: 'detailed/:id/',
      children: [
        {
          path: '',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE,
          props: getUserIdFromRoute,
          component: useLoadingImport(() => import('pages/PAdminUserProfile/ui/PAdminUserProfile.vue')),
        },
        {
          path: 'bio',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO,
          props: getUserIdFromRoute,
          component: useLoadingImport(() => import('pages/PAdminUserProfileBio/ui/PAdminUserProfileBio.vue')),
        },
        {
          path: 'trainings',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_TRAININGS,
          props: getUserIdFromRoute,
          component: useLoadingImport(() => {
            Loading.show();
            return import('pages/PAdminUserWorkout/ui/PAdminUserWorkout.vue');
          }),
        },
        {
          path: 'nutrition',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_NUTRITION,
          props: getUserIdFromRoute,
          component: useLoadingImport(
            () => import('pages/PAdminUserProfileNutrition/ui/PAdminUserProfileNutrition.vue'),
          ),
        },
        {
          path: 'diary',
          meta: { auth: true, admin: true },
          name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY,
          props: getUserIdFromRoute,
          component: useLoadingImport(() => import('pages/PAdminDiary/ui/PAdminDiary.vue')),
        },
      ],
    },
  ],
  redirect: '/admin',
};
