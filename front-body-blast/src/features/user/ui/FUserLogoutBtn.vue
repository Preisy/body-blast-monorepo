<script setup lang="ts">
import { useAnthropometryStore } from 'entities/anthropometry';
import { useDiaryStore } from 'entities/diary';
import { useUserStore } from 'shared/api';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui';

const router = useRouter();

const { clear: clearMe } = useUserStore();
const { clear: clearDiary } = useDiaryStore();
const { clear: clearAnthropometry } = useAnthropometryStore();

const logout = () => {
  useUserStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
  clearMe();
  clearDiary();
  clearAnthropometry();
};
</script>

<template>
  <SBtn icon="sym_r_move_item" @click="logout" />
</template>
