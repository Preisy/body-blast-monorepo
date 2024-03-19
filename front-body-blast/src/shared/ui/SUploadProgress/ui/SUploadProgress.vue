<script setup lang="ts">
import { UploadProgressEventData, fileEventBus } from 'shared/api/admin';

type Data = Record<string, UploadProgressEventData>;
const filesPending = reactive<Data>({});
fileEventBus.on('uploadProgress', (data) => {
  filesPending[data.filename] = data;
});

fileEventBus.on('uploadDone', (data) => {
  setTimeout(() => {
    delete filesPending[data.filename];
  });
});
</script>

<template>
  <div v-if="Object.entries(filesPending).length" class="s-upload-progress" flex flex-col px-1.5rem text-primary>
    <h2>{{ $t('global.loading') }}</h2>
    <div
      v-for="progress in filesPending"
      :key="progress.filename"
      relative
      w-full
      overflow-hidden
      rounded-0.5rem
      bg-black
      p-0.5rem
    >
      <h2 top="50%" left="50%" absolute text-1rem text="secondary" mix-blend-difference class="translate--50%">
        {{ progress.estimated?.toFixed(2) }} с
      </h2>
      <div class="progress-bar" :style="{ width: `${progress.progress * 100}%` }" h-1.5rem rounded-1rem bg-secondary />
    </div>
  </div>
</template>
