<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedHome,
  symRoundedPlayArrow,
  symRoundedRestaurant,
  symRoundedSettings,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { ENUMS } from 'shared/lib/enums';
import { SFooterNavLink, SFooterNavLinkProps } from 'shared/ui/SFooterNavLink';

const route = useRoute();
const { t } = useI18n();

const links = computed<SFooterNavLinkProps[]>(() => {
  let result: SFooterNavLinkProps[] = [
    { imgSrc: symRoundedHome, title: t('admin.footer.links.home'), name: ENUMS.ROUTES_NAMES.ADMIN.HOME },
    { imgSrc: symRoundedSettings, title: t('admin.footer.links.prompt'), name: ENUMS.ROUTES_NAMES.ADMIN.PROMPT },
    { imgSrc: symRoundedPlayArrow, title: t('admin.footer.links.learning'), name: ENUMS.ROUTES_NAMES.ADMIN.LEARNING },
  ];

  //TODO: better
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
        title: t('admin.footer.links.trainings'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_TRAININGS,
      },
      {
        imgSrc: symRoundedEdit,
        title: t('dashboard.footer.links.diary'),
        name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_DIARY,
      },
      {
        imgSrc: symRoundedRestaurant,
        title: t('dashboard.footer.links.diet'),
        name: ENUMS.ROUTES_NAMES.DIET,
      },
    ];

  return result;
});
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer w-admin-footer">
    <q-tabs flex flex-row justify-between px-0.5rem>
      <SFooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </q-tabs>
  </q-footer>
</template>
