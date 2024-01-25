<script setup lang="ts">
import { QImg, QImgProps } from 'quasar';
import { AdminFile, useAdminFileStore } from 'shared/api/admin';
import { useSingleState } from 'shared/lib/utils';

export interface SAuthImgProps {
  src: string;
}

const props = defineProps<SAuthImgProps>();
const { getFileByName } = useAdminFileStore();
const getFilename = (rawlink: string) => rawlink.split('/').pop()!;

const state = ref(useSingleState<AdminFile.GetByName.Response>());

const data = computed(() => state.value.data);
const link = computed<QImgProps['src']>(() => (data.value ? URL.createObjectURL(data.value) : undefined));

watchEffect(() => getFileByName({ filename: getFilename(props.src) }, state.value));
onUnmounted(() => {
  if (link.value) URL.revokeObjectURL(link.value);
});
</script>

<template>
  <QImg :src="link" />
</template>
