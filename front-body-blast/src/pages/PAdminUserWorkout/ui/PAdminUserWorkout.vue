<script setup lang="ts">
import moment from 'moment';
import { WNewTraining } from 'widgets/WNewTraining';
import { WOldTraining } from 'widgets/WOldTraining';
import { useAdminWorkoutStore } from 'shared/api/admin';
import { SCalendar } from 'shared/ui/SCalendar';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserWorkoutProps {
  id: number;
}
defineProps<PAdminUserWorkoutProps>();

const today = moment().format('YYYY/MM/DD');
const date = ref(today);

const { getWorkouts, getWorkoutsResponse } = useAdminWorkoutStore();
const pageNumber = ref(1);
watchEffect(() => getWorkouts({ expanded: true, limit: 20, page: pageNumber.value }));

const oldWorkouts = computed(() => getWorkoutsResponse.data?.data);
const dateSortedWorkout = computed(() => oldWorkouts.value?.sort((left, right) => (left.date > right.date ? 1 : -1)));

const editWorkoutDialog = ref(false);
const editingWorkoutId = ref<number>();
const onEdit = (id: number) => {
  editingWorkoutId.value = id;
  editWorkoutDialog.value = true;
};
</script>

<template>
  <SStructure h-full flex flex-col>
    <SCalendar v-model="date" pb-1rem pt-2rem />
    <q-tab-panels v-model="date" swipeable h-full>
      <q-tab-panel
        v-for="workout in dateSortedWorkout"
        :key="workout.id"
        :name="workout.date"
        class="overflow-hidden! p-0!"
        h-full
      >
        <SProxyScroll h-full>
          <WOldTraining :workout="workout" @edit="onEdit" />
        </SProxyScroll>
      </q-tab-panel>
      <q-tab-panel :name="today" class="overflow-hidden! p-0!" h-full>
        <SProxyScroll h-full>
          <WNewTraining :date="date" :id="id" />
        </SProxyScroll>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="editWorkoutDialog">
      <div bg-bg p-1rem>
        <WNewTraining
          :date="date"
          :id="id"
          :is-edit="true"
          :workout-id="editingWorkoutId"
          @edit="editWorkoutDialog = false"
        />
      </div>
    </q-dialog>
  </SStructure>
</template>
