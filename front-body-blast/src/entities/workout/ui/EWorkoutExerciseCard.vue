<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Workout } from 'entities/workout';
import { SReadonlyFieldProps, SComponentWrapper, SVideoWithPreview } from 'shared/ui';
import InfoBlock from './InfoBlock.vue';

export interface EWorkoutExerciseCardProps {
  exercise: NonNullable<Workout['exercises']>[number];
  videoLink?: string;
  photoLink: string;
}
const props = defineProps<EWorkoutExerciseCardProps>();
const { t } = useI18n();

const cards = computed<Array<SReadonlyFieldProps>>(() => [
  { title: t(`dashboard.workout.infoBlock.weight`), value: props.exercise.weight },
  { title: t(`dashboard.workout.infoBlock.sets`), value: props.exercise.sets },
  { title: t(`dashboard.workout.infoBlock.repetitions`), value: props.exercise.repetitions },
  { title: t(`dashboard.workout.infoBlock.restTime`), value: props.exercise.restTime },
  { title: t(`dashboard.workout.infoBlock.pace`), value: props.exercise.pace },
]);
</script>

<template>
  <SComponentWrapper>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ exercise.name }}</h1>
        <p>{{ exercise.trainerComment }}</p>
      </div>
      <SVideoWithPreview :video-link="videoLink" :photo-link="photoLink" play-button-class="bg-secondary!" />
      <InfoBlock :cards="cards" />
    </div>
  </SComponentWrapper>
</template>
