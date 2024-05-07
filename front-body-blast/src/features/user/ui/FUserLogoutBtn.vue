<script setup lang="ts">
import { useAnthropometryStore } from 'entities/anthropometry';
import { useDiaryStore } from 'entities/diary';
import { useAuthStore } from 'shared/api/auth';
import { useMeStore } from 'shared/api/me';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui';

const router = useRouter();

const { clear: clearMe } = useMeStore();
const { clear: clearDiary } = useDiaryStore();
const { clear: clearAnthropometry } = useAnthropometryStore();

const logout = () => {
  useAuthStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
  clearMe();
  clearDiary();
  clearAnthropometry();
};
</script>

<template>
  <SBtn icon="sym_r_move_item" @click="logout" />
</template>
