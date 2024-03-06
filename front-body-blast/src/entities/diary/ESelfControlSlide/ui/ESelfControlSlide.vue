<script setup lang="ts">
import moment from 'moment';
import { Diary } from 'shared/api/diary';
import { SBtnToggle } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';

export interface ESelfControlSlideProps {
  diary: Diary;
}
defineProps<ESelfControlSlideProps>();

const propsTotal = (diary: Diary) => diary.props?.reduce((prev, prop) => (prev += prop.value), 0);
const toggleOpts = [1, 2, 3, 4, 5].map((value) => ({
  value,
  label: value.toString(),
}));

const dropdownElement = ref<HTMLDivElement>();
const isDropdownShown = ref<boolean>(false);
const dropdownStyle = computed(() => {
  if (!dropdownElement.value) return '';
  const boundingRect = dropdownElement.value?.getBoundingClientRect();
  const deltaHeight = -boundingRect.height + 'px';
  const result = `calc(${deltaHeight} - 0.5rem)`;
  return isDropdownShown.value ? '' : result;
});
const ISODateToDDMM = (ISOString: string) => moment(ISOString).format('DD.MM');
</script>

<template>
  <div @click="isDropdownShown = !isDropdownShown" overflow-hidden rounded-1rem>
    <div flex flex-row gap-0.5rem rounded-1rem bg-bg>
      <SReadonlyField
        :title="$t('admin.diary.mode') + ' ' + ISODateToDDMM(diary.date)"
        :value="$t('admin.diary.cycle') + ' ' + (diary.cycle ?? '?')"
        class="cycles"
        w="100%"
        bg-accent
      />
      <SReadonlyField
        :title="$t('admin.diary.total') + ' ' + ISODateToDDMM(diary.date)"
        :value="propsTotal(diary) ?? 0"
        class="total"
        w="100%"
      />
    </div>
    <div
      ref="dropdownElement"
      class="dropdown"
      :class="{ isShown: isDropdownShown }"
      :style="{ marginTop: dropdownStyle }"
      relative
      z--1
      mt-0.5rem
      transition-500
      ease-in-out
    >
      <div v-for="prop in diary.props" :key="prop.id" mt-0.5rem>
        <p>{{ prop.label }}</p>
        <SBtnToggle :model-value="prop.value" :options="toggleOpts" />
      </div>
    </div>
  </div>
</template>
