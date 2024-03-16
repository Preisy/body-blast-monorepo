<script setup lang="ts">
import moment from 'moment';
import { TouchSwipeValue } from 'quasar';
import { WNewTraining } from 'widgets/WNewTraining';
import { WOldTraining } from 'widgets/WOldTraining';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Workout } from 'shared/api/workout';
import { gtCreation } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserWorkoutProps {
  id: AppBaseEntity['id'];
}
defineProps<PAdminUserWorkoutProps>();

const today = moment();
const date = ref(today.format('YYYY/MM/DD'));
const momentDate = computed(() => moment(date.value.split('/').join('-')));
const { getWorkouts, workoutList } = useAdminWorkoutStore();
watch(
  date,
  () =>
    getWorkouts({
      expanded: true,
      from: momentDate.value.toISOString(),
      to: momentDate.value.add(1, 'd').subtract(1, 'second').toISOString(),
    }),
  {
    immediate: true,
  },
);

const workoutListData = computed(() => workoutList.data?.data);
const workout = computed(() => workoutListData.value?.at(0));

const editingWorkout = ref<Workout | null>();
const onEdit = (id: Workout) => {
  editingWorkout.value = id;
};
const clearEditing = () => {
  editingWorkout.value = null;
};

const onSwipe = (event: Parameters<Exclude<TouchSwipeValue, undefined>>['0']) => {
  if (event.direction === 'left') {
    date.value = momentDate.value.add(1, 'day').format('YYYY/MM/DD');
  }
  if (event.direction === 'right') {
    const newVal = momentDate.value.clone().subtract(1, 'day').format('YYYY/MM/DD');
    const isLegal = gtCreation(newVal);
    if (!isLegal) return;
    date.value = newVal;
  }
};
</script>

<template>
  <SStructure h-full flex flex-col>
    <SCalendar v-model="date" :options="(date) => gtCreation(date)" mb-1rem mt-1rem />

    <SProxyScroll h-full type="vertical" v-touch-swipe.horizontal="onSwipe">
      <WOldTraining v-if="!editingWorkout && workout" :workout="workout" @edit="onEdit" />
      <WNewTraining
        v-else
        :date="date.split('/').join('-')"
        :id="id"
        :init-values="editingWorkout ?? undefined"
        :workout-id="editingWorkout?.id"
        :is-edit="!!editingWorkout"
        @reject-edit="clearEditing"
        @edit="clearEditing"
      />
    </SProxyScroll>
  </SStructure>
</template>
