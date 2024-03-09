<script setup lang="ts">
import moment from 'moment';
import { WNewTraining } from 'widgets/WNewTraining';
import { WOldTraining } from 'widgets/WOldTraining';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { Workout } from 'shared/api/workout';
import { isToday } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserWorkoutProps {
  id: number;
}
defineProps<PAdminUserWorkoutProps>();

const today = moment();
const date = ref(today.format('YYYY/MM/DD'));

const { getWorkouts, workoutList } = useAdminWorkoutStore();
const pageNumber = ref(1);
watchEffect(() => getWorkouts({ expanded: true, limit: 20, page: pageNumber.value }));

const workoutListData = computed(() => workoutList.data?.data);
const todayWorkout = computed(() => workoutListData.value?.find((workout) => isToday(workout.date)));
const dateSortedWorkoutsWithoutToday = computed(
  () =>
    workoutListData.value
      ?.sort((left, right) => (left.date > right.date ? 1 : -1))
      .filter((workout) => workout.id !== todayWorkout.value?.id),
);

const editingWorkout = ref<Workout | null>();
const onEdit = (id: Workout) => {
  editingWorkout.value = id;
};
const clearEditing = () => {
  editingWorkout.value = null;
};
</script>

<template>
  <!-- TODO: Refactor. Today slide and past slides are much the same. -->
  <!-- WOldTraining & WNewTraning - bad names -->
  <SStructure h-full flex flex-col>
    <SCalendar
      v-model="date"
      :options="dateSortedWorkoutsWithoutToday?.map((workout) => moment(workout.date).format('YYYY/MM/DD'))"
      pb-1rem
      pt-2rem
    />
    <q-tab-panels v-model="date" swipeable animated h-full>
      <q-tab-panel
        v-for="workout in dateSortedWorkoutsWithoutToday"
        :key="workout.id"
        :name="workout.date"
        class="overflow-hidden! p-0!"
        h-full
      >
        <SProxyScroll h-full>
          <WOldTraining v-if="!editingWorkout" :workout="workout" @edit="onEdit" />
          <WNewTraining
            v-else
            :date="date"
            :id="id"
            :init-values="editingWorkout ?? undefined"
            :workout-id="editingWorkout?.id"
            :is-edit="!!editingWorkout"
            @reject-edit="clearEditing"
            @edit="clearEditing"
          />
        </SProxyScroll>
      </q-tab-panel>
      <q-tab-panel :name="today.format('YYYY/MM/DD')" class="overflow-hidden! p-0!" h-full>
        <SProxyScroll h-full>
          <WOldTraining v-if="todayWorkout && !editingWorkout" :workout="todayWorkout" @edit="onEdit" />
          <WNewTraining
            v-else
            :date="date"
            :id="id"
            :init-values="editingWorkout ?? undefined"
            :workout-id="editingWorkout?.id"
            :is-edit="!!editingWorkout"
            @reject-edit="clearEditing"
            @edit="clearEditing"
          />
        </SProxyScroll>
      </q-tab-panel>
    </q-tab-panels>
  </SStructure>
</template>
