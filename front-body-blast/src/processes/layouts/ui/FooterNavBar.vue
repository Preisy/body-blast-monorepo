<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedPlayArrow,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { useUserStore } from 'shared/api';
import { ENUMS, useLoadingAction } from 'shared/lib';
import { SFooterNavLink, SFooterNavLinkProps } from 'shared/ui';

const { t } = useI18n();
const userStore = useUserStore();
useLoadingAction(userStore.user, userStore.getUser);

const userData = computed(() => userStore.user.data?.data);
const links = computed<SFooterNavLinkProps[]>(() => {
  const base = [
    {
      imgSrc: symRoundedExercise,
      title: t('dashboard.footer.links.workout'),
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
      title: t('dashboard.footer.links.nutrition'),
      name: ENUMS.ROUTES_NAMES.NUTRITION,
    },
    {
      imgSrc: symRoundedPlayArrow,
      title: t('dashboard.footer.links.learning'),
      name: ENUMS.ROUTES_NAMES.LEARNING,
    },
  ];
  if (!userData.value?.canWatchVideo) base.pop();
  return base;
});
</script>

<template>
  <q-footer class="w-footer" rounded-t-2rem bg-bg boxshadow-footer>
    <q-tabs flex flex-row class="justify-between!">
      <SFooterNavLink v-for="navlink of links" :key="navlink.imgSrc" v-bind="navlink" />
    </q-tabs>
  </q-footer>
</template>
