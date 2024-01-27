<script setup lang="ts">
import { QTabPanel, QTabPanels, TouchSwipeValue } from 'quasar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';

type SlideContent = object & { name: string };
export interface SPaginationSliderProps {
  slides: Array<SlideContent> | null; //Count of slides in one page
  lock: boolean; //is slider interactable? recomended to lock, while fetching api
  modelValue: number; //index in slide
}
const props = defineProps<SPaginationSliderProps>();
const emits = defineEmits<{
  'update:modelValue': [number];
  lastElement: [];
  firstElement: [];
}>();

const count = computed(() => props.slides?.length ?? 0);
const value = computed(() => (!props.lock ? props.slides?.at(props.modelValue)?.name : ''));

const onUpdate = async (event: Parameters<Exclude<TouchSwipeValue, undefined>>['0']) => {
  if (props.lock) return;

  const delta = event.direction === 'right' ? -1 : 1;
  let localIndex = props.modelValue + delta;
  emits('update:modelValue', localIndex);

  if (localIndex === count.value) {
    emits('lastElement');
    emits('update:modelValue', 0);
  }

  if (localIndex === -1) {
    emits('firstElement');
    emits('update:modelValue', count.value - 1);
  }
};
</script>

<template>
  <SComponentWrapper>
    <QTabPanels swipeable animated class="s-pagination-slider" v-model="value" v-touch-swipe.horizontal="onUpdate">
      <template v-for="slide in slides">
        <QTabPanel v-if="slide" :key="slide.name" :name="slide.name" class="s-pagination-slide" p-0>
          <slot />
        </QTabPanel>
      </template>
    </QTabPanels>
  </SComponentWrapper>
</template>
