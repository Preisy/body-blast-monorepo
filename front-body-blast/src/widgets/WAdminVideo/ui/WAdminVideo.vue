<script setup lang="ts">
import { symRoundedDelete, symRoundedPause, symRoundedPlayArrow } from '@quasar/extras/material-symbols-rounded';
import { useAdminBonusVideoStore } from 'shared/api/admin';
import { BonusVideo } from 'shared/api/bonusVideo';
import { useAuthLink } from 'shared/lib/hooks';
import { SBtn } from 'shared/ui/btns/';
import { SVideo } from 'shared/ui/SVideo';

export interface WAdminVideoProps {
  video: BonusVideo;
}
const props = defineProps<WAdminVideoProps>();
const { state: link } = useAuthLink(props.video.linkUrl);

const { videoList, deleteVideo } = useAdminBonusVideoStore();

const videoRef = ref<InstanceType<typeof SVideo>>();
const onPlay = () => {
  if (videoRef.value?.isPlaying) videoRef.value.pause();
  else videoRef.value?.play();
};
const onDelete = () => {
  deleteVideo(props.video.id);
};
</script>

<template>
  <div w-full>
    <h2 mb-4>{{ video.name }}</h2>
    <div>
      <template v-if="link.data">
        <SVideo ref="videoRef" :link-url="link.data.link" disable-btn />
        <div translate-y="-50%" w="90%" mx-auto flex flex-row>
          <SBtn @click="onPlay" :icon="videoRef?.isPlaying ? symRoundedPause : symRoundedPlayArrow" bg="bg!" />
          <SBtn @click="onDelete" :icon="symRoundedDelete" :loading="videoList.deleteState.isLoading()" ml-auto />
        </div>
      </template>
      <SNoResultsScreen v-else />
    </div>
  </div>
</template>
