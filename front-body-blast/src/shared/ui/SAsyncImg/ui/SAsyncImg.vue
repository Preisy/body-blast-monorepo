<script setup lang="ts">
import { QImg, QImgProps } from 'quasar';
import { useAdminFileStore } from 'shared/api/admin';
export interface SAsyncImgProps {
  src: string;
}
const props = defineProps<SAsyncImgProps>();
const { getFileByName } = useAdminFileStore();

const getFilename = (rawlink: string) => rawlink.split('/').pop()!;

const link = ref<QImgProps['src']>(undefined);
onMounted(async () => {
  const data = await getFileByName({ filename: getFilename(props.src) });
  link.value = data.data ? URL.createObjectURL(data.data) : undefined;
});
onUnmounted(() => {
  if (link.value) URL.revokeObjectURL(link.value);
});
</script>

<template>
  <QImg :src="link" />
</template>
