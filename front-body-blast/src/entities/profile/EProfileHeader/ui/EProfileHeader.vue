<script setup lang="ts">
import { useAuthStore } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/btns';
export interface EProfileHeaderProps {
  userName: string;
}
defineProps<EProfileHeaderProps>();

const router = useRouter();

const logout = () => {
  useAuthStore().logout();
  router.push({ name: ENUMS.ROUTES_NAMES.LOGIN });
};
</script>

<template>
  <div m--2 mb-0 border bg-primary p-6 text-bg>
    <h1 mb-0>{{ userName }}</h1>
    <p>{{ $t('home.profile.header.student') }}</p>
    <div mt-4 flex justify-between>
      <SBtn icon="edit" class="bg-bg!" />
      <SBtn icon="sym_r_move_item" @click="logout" />
    </div>
  </div>
</template>
