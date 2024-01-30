<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Workout } from 'shared/api/workout';
import { SReadonlyFieldProps } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface ETrainingCardProps {
  exercises: NonNullable<Workout['exercises']>[number];
}
const props = defineProps<ETrainingCardProps>();
const { t } = useI18n();

const cards = computed<Array<SReadonlyFieldProps>>(() => [
  { title: t(`dashboard.trainings.infoBlock.weight`), value: props.exercises.weight },
  { title: t(`dashboard.trainings.infoBlock.sets`), value: props.exercises.sets },
  { title: t(`dashboard.trainings.infoBlock.repetitions`), value: props.exercises.repetitions },
  { title: t(`dashboard.trainings.infoBlock.restTime`), value: props.exercises.restTime },
  { title: t(`dashboard.trainings.infoBlock.pace`), value: props.exercises.pace },
]);
</script>

<template>
  <SComponentWrapper>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ exercises.name }}</h1>
        <p>{{ exercises.trainerComment }}</p>
      </div>
      <TrainingAnim :url="exercises.videoLink" />
      <InfoBlock :cards="cards" />
    </div>
  </SComponentWrapper>
</template>
