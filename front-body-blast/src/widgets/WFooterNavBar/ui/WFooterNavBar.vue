<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedPlayArrow,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { ENUMS } from 'shared/lib/enums';
import FooterNavLink, { FooterNavLinkProps } from './FooterNavLink.vue';

const { t } = useI18n();
const links: FooterNavLinkProps[] = [
  {
    imgSrc: symRoundedExercise,
    title: t('dashboard.footer.links.trainings'),
    href: ENUMS.ROUTES_NAMES.TRAINING,
  },
  {
    imgSrc: symRoundedAccountCircle,
    title: t('dashboard.footer.links.profile'),
    href: ENUMS.ROUTES_NAMES.PROFILE,
  },
  {
    imgSrc: symRoundedEdit,
    title: t('dashboard.footer.links.diary'),
    href: ENUMS.ROUTES_NAMES.DIARY,
  },
  {
    imgSrc: symRoundedRestaurant,
    title: t('dashboard.footer.links.diet'),
    href: ENUMS.ROUTES_NAMES.DIET,
  },
  {
    imgSrc: symRoundedPlayArrow,
    title: t('dashboard.footer.links.learning'),
    href: ENUMS.ROUTES_NAMES.LEARNING,
  },
];
</script>

<template>
  <q-footer fixed bottom-0 left-0 right-0 rounded-t-2rem bg-bg boxshadow-footer class="w-footer">
    <q-tabs flex flex-row class="justify-between!">
      <FooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </q-tabs>
  </q-footer>
</template>
