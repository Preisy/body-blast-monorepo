<script setup lang="ts">
import { useProfileStore } from 'shared/api/anthropometry';
import { useAuthStore } from 'shared/api/auth';
import { useDiaryStore } from 'shared/api/diary';
import { useMeStore } from 'shared/api/me';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/btns';
export interface EProfileHeaderProps {
  userName: string;
}
defineProps<EProfileHeaderProps>();

const router = useRouter();

const { clear: clearMe } = useMeStore();
const { clear: clearDiary } = useDiaryStore();
const { clear: clearAnthropometry } = useProfileStore();

const logout = () => {
  useAuthStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
  clearMe();
  clearDiary();
  clearAnthropometry();
};
</script>

<template>
  <div m--2 mb-0 border bg-primary p-6 text-bg>
    <h1 mb-0>{{ userName }}</h1>
    <p>{{ $t('home.profile.header.student') }}</p>
    <div mt-4 flex justify-between>
      <SBtn icon="edit" class="bg-bg!" :to="{ name: ENUMS.ROUTES_NAMES.PROFILE_EDIT }" />
      <SBtn icon="sym_r_move_item" @click="logout" />
    </div>
  </div>
</template>
