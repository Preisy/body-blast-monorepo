<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Workout } from 'shared/api/workout';
import { SComponentWrapper } from 'shared/ui/component-wrapper';
import { SReadonlyFieldProps } from 'shared/ui/inputs';
import InfoBlock from './InfoBlock.vue';
import WorkoutAnim from './WorkoutAnim.vue';

export interface EWorkoutCardProps {
  exercises: NonNullable<Workout['exercises']>[number];
}
const props = defineProps<EWorkoutCardProps>();
const { t } = useI18n();

const cards = computed<Array<SReadonlyFieldProps>>(() => [
  { title: t(`dashboard.workout.infoBlock.weight`), value: props.exercises.weight },
  { title: t(`dashboard.workout.infoBlock.sets`), value: props.exercises.sets },
  { title: t(`dashboard.workout.infoBlock.repetitions`), value: props.exercises.repetitions },
  { title: t(`dashboard.workout.infoBlock.restTime`), value: props.exercises.restTime },
  { title: t(`dashboard.workout.infoBlock.pace`), value: props.exercises.pace },
]);
</script>

<template>
  <SComponentWrapper>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ exercises.name }}</h1>
        <p>{{ exercises.trainerComment }}</p>
      </div>
      <WorkoutAnim :video-link="exercises.videoLink" :photo-link="exercises.photoLink" />
      <InfoBlock :cards="cards" />
    </div>
  </SComponentWrapper>
</template>
