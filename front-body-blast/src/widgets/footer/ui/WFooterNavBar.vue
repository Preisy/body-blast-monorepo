<script setup lang="ts">
import {
  symRoundedAccountCircle,
  symRoundedEdit,
  symRoundedExercise,
  symRoundedPlayArrow,
  symRoundedRestaurant,
} from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { useMeStore } from 'shared/api/me';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { SFooterNavLink, SFooterNavLinkProps } from 'shared/ui/footer-nav-link';

const { t } = useI18n();
const meStore = useMeStore();
useLoadingAction(meStore.me, meStore.getMe);

const meData = computed(() => meStore.me.data?.data);
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
  if (!meData.value?.canWatchVideo) base.pop();
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
