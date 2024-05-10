<script setup lang="ts">
import { UploadProgressEventData, fileEventBus } from '..';

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
  <div
    v-if="Object.entries(filesPending).length"
    class="s-upload-progress"
    flex
    flex-col
    gap-y-0.25rem
    px-1.5rem
    text-primary
  >
    <div v-for="progress in filesPending" :key="progress.filename" flex flex-row items-center>
      <p text="primary" text-1rem font-bold mix-blend-difference>
        {{ progress.estimated?.toFixed(2) }} {{ $t('global.seconds_short') }}
      </p>
      <div relative w-full flex-1 overflow-hidden rounded-0.5rem p-0.5rem>
        <div
          class="progress-bar"
          :style="{ width: `${progress.progress * 100}%` }"
          h-0.25rem
          rounded-1rem
          bg-secondary
        />
      </div>
    </div>
  </div>
</template>
