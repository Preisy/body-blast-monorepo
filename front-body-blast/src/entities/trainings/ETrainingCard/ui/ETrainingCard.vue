<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { Workout } from 'shared/api/workout';
import { SReadonlyFieldProps } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import InfoBlock from './InfoBlock.vue';
import TrainingAnim from './TrainingAnim.vue';

export interface ETrainingCardProps {
  training: NonNullable<Workout['exercises']>[number];
}
const props = defineProps<ETrainingCardProps>();
const { t } = useI18n();

const cards = computed<Array<SReadonlyFieldProps>>(() => [
  { title: t(`dashboard.trainings.infoBlock.weight`), value: props.training.weight },
  { title: t(`dashboard.trainings.infoBlock.sets`), value: props.training.sets },
  { title: t(`dashboard.trainings.infoBlock.repetitions`), value: props.training.repetitions },
  { title: t(`dashboard.trainings.infoBlock.restTime`), value: props.training.restTime },
  { title: t(`dashboard.trainings.infoBlock.pace`), value: props.training.pace },
]);
</script>

<template>
  <SComponentWrapper>
    <div flex flex-col gap-1rem>
      <div>
        <h1>{{ training.name }}</h1>
        <p>{{ training.trainerComment }}</p>
      </div>
      <TrainingAnim :url="training.videoLink" />
      <InfoBlock :cards="cards" />
    </div>
  </SComponentWrapper>
</template>
