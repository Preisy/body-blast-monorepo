<script setup lang="ts">
import { SBtn } from 'shared/ui/btns';
defineProps<{
  url: string;
}>();

const isPlaying = ref<boolean>(false);
const iconName = computed(() => (isPlaying.value ? 'sym_r_pause' : 'sym_r_play_arrow'));
</script>

<template>
  <div relative w-full>
    <q-img :src="url" fit="contain" />
    <SBtn mt--2rem>
      <q-icon :name="iconName" text="2rem!" />
    </SBtn>
  </div>
</template>
