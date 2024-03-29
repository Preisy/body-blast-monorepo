<script setup lang="ts">
import moment, { Moment } from 'moment';
import { WSelfControlList } from 'widgets/WSelfControlList';
import { WStepsList } from 'widgets/WStepsList';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Diary } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { toWeekRange } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminDiaryProps {
  id: AppBaseEntity['id'];
}
const props = defineProps<PAdminDiaryProps>();
const { getUserSteps, getUserDiaries, userDiaries, userSteps } = useAdminUserProfileStore();

// 2024-02-01T23:59:59.000Z
const dateRaw = ref<Moment>(moment());
const calendarDate = computed(() => dateRaw.value.format('YYYY/MM/DD'));
// 2024-02-01T00:00:00.000Z
const date = computed(() => dateRaw.value.clone().utcOffset(0).date(1).hour(0).minute(0).seconds(0).milliseconds(0));
// 2024-03-01T00:00:00.000 <- Difference with 'date' only in MM field
const dateMonthPlusOne = computed(() => date.value.clone().add(1, 'M'));

watch(
  dateMonthPlusOne,
  () => {
    useLoadingAction(userSteps, async () => {
      //get all diaries in month range
      await getUserDiaries({
        id: props.id,
        pagination: { expanded: true, from: date.value.toISOString(), to: dateMonthPlusOne.value.toISOString() },
      });
      //get all steps in month range
      return getUserSteps({
        id: props.id,
        pagination: { expanded: true, from: date.value.toISOString(), to: dateMonthPlusOne.value.toISOString() },
      });
    });
  },
  { immediate: true },
);

const diariesData = computed(() => userDiaries.data?.data);
const stepsData = computed(() => userSteps.data);

const diariesSlides = computed(() => {
  const diariesSlides: Record<string, Array<Diary>> = {};
  diariesData.value?.forEach((slide) => {
    const week = toWeekRange(slide.date);
    if (week in diariesSlides) diariesSlides[week].push(slide);
    else diariesSlides[week] = [slide];
  });
  return diariesSlides;
});
</script>

<template>
  <SStructure my-1rem h-full>
    <SCalendar
      :model-value="calendarDate"
      @update:model-value="(v) => (dateRaw = moment(v.split('/').join('-')))"
      default-view="Months"
      :emit-immediately="true"
      today-btn
    />

    <SProxyScroll h-full p-1.5rem>
      <WStepsList :weeks="stepsData?.weeks ?? []" mb-2rem />
      <WSelfControlList
        v-for="week in Object.keys(diariesSlides)"
        :key="week"
        :slides="diariesSlides[week]"
        :week="week"
      />
    </SProxyScroll>
  </SStructure>
</template>
