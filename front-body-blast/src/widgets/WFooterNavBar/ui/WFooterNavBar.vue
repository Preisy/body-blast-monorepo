<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { ENUMS } from 'shared/lib/enums';
import { SFooterNavLink, SFooterNavLinkProps } from 'shared/ui/SFooterNavLink';

const { t } = useI18n();
const links: SFooterNavLinkProps[] = [
  {
    imgSrc: symRoundedExercise,
    title: t('dashboard.footer.links.trainings'),
    name: ENUMS.ROUTES_NAMES.TRAINING,
  },
  {
    imgSrc: symRoundedAccountCircle,
    title: t('dashboard.footer.links.profile'),
    name: ENUMS.ROUTES_NAMES.PROFILE,
  },
  {
    imgSrc: symRoundedEdit,
    title: t('dashboard.footer.links.diary'),
    name: ENUMS.ROUTES_NAMES.DIARY,
  },
  {
    imgSrc: symRoundedRestaurant,
    title: t('dashboard.footer.links.diet'),
    name: ENUMS.ROUTES_NAMES.DIET,
  },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <q-tabs flex flex-row justify-between px-0.5rem>
      <SFooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </q-tabs>
  </q-footer>
</template>
