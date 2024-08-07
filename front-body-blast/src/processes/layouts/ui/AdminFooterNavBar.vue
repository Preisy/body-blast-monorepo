<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedAppRegistration,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedHome,
  symRoundedPlayArrow,
  symRoundedRestaurant,
  symRoundedSettings,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { EFileUploadProgress } from 'entities/file';
import { ENUMS } from 'shared/lib';
import { SFooterNavLink, SFooterNavLinkProps } from 'shared/ui';

const route = useRoute();
const { t } = useI18n();

const links = computed<SFooterNavLinkProps[]>(() => {
  let result: SFooterNavLinkProps[] = [
    { imgSrc: symRoundedHome, title: t('admin.footer.links.home'), name: ENUMS.ROUTES_NAMES.ADMIN.HOME },
    { imgSrc: symRoundedSettings, title: t('admin.footer.links.prompt'), name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT },
    { imgSrc: symRoundedPlayArrow, title: t('admin.footer.links.learning'), name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING },
  ];

  if (route.matched.find((route) => route.path.includes('detailed')))
    result = [
      {
        imgSrc: symRoundedHome,
        title: t('admin.footer.links.home'),
        name: ENUMS.ROUTES_NAMES.ADMIN.HOME,
      },
      {
        imgSrc: symRoundedAccountCircle,
        title: t('admin.footer.links.profile'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE,
      },
      {
        imgSrc: symRoundedExercise,
        title: t('admin.footer.links.workout'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_TRAININGS,
      },
      {
        imgSrc: symRoundedEdit,
        title: t('dashboard.footer.links.diary'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY,
      },
      {
        imgSrc: symRoundedAppRegistration,
        title: t('dashboard.footer.links.diary'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY_EDIT,
      },
      {
        imgSrc: symRoundedRestaurant,
        title: t('dashboard.footer.links.nutrition'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_NUTRITION,
      },
    ];

  return result;
});
</script>

<template>
  <q-footer class="w-footer w-admin-footer" bg-unset>
    <EFileUploadProgress w-full py-1rem />
    <div rounded-t-2rem bg-bg boxshadow-footer>
      <q-tabs flex flex-row justify-between px-0.5rem>
        <SFooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
      </q-tabs>
    </div>
  </q-footer>
</template>
