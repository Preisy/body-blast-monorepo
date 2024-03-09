<script setup lang="ts">
import moment from 'moment';
import { WSelfControlList } from 'widgets/WSelfControlList';
import { WStepsList } from 'widgets/WStepsList';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { Diary } from 'shared/api/diary';
import { useLoadingAction } from 'shared/lib/loading';
import { toWeekRange } from 'shared/lib/utils';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SProxyScroll } from 'shared/ui/SProxyScroll';

export interface PAdminDiaryProps {
  id: number;
}
const props = defineProps<PAdminDiaryProps>();
const { getUserSteps, getUserDiaries, userDiaries, userSteps } = useAdminUserProfileStore();

// 2024-02-01T23:59:59.000Z
const dateRaw = ref<string>(moment().toISOString());
// 2024-02-01T00:00:00.000Z
const date = computed<string>(() =>
  moment(dateRaw.value).utcOffset(0).date(1).hour(0).minute(0).seconds(0).milliseconds(0).toISOString(),
);
// 2024-03-01T00:00:00.000 <- Difference with 'date' only in MM field
const dateMonthPlusOne = computed(() => moment(date.value).add(1, 'M').toISOString());

watchEffect(() => {
  useLoadingAction(userSteps, async () => {
    //get all diaries in month range
    await getUserDiaries({
      id: props.id,
      pagination: { expanded: true, from: date.value, to: dateMonthPlusOne.value },
    });
    //get all steps in month range
    return getUserSteps({ id: props.id, pagination: { expanded: true, from: date.value, to: dateMonthPlusOne.value } });
  });
});

const diariesData = computed(() => userDiaries.data?.data);
const stepsData = computed(() => userSteps.data?.data);

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
  <SComponentWrapper h-full>
    <SCalendar
      v-model="dateRaw"
      default-view="Months"
      mask="YYYY-MM-01T23:59:59.000"
      emit-immediately
      today-btn
      minimal
    />

    <SProxyScroll h-full>
      <WStepsList :weeks="stepsData?.weeks ?? []" mb-2rem />
      <WSelfControlList
        v-for="week in Object.keys(diariesSlides)"
        :key="week"
        :slides="diariesSlides[week]"
        :week="week"
      />
    </SProxyScroll>
  </SComponentWrapper>
</template>
