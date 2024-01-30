<script lang="ts" setup>
export interface SCenteredByChildProps {
  modelValue: string;
  gap: number;
}
const props = defineProps<SCenteredByChildProps>();

const offset = ref<number>(0);
const ind = ref<number>(0);
const Element = ref<HTMLElement>();

const setOffset = (Elements: HTMLElement[]) => {
  ind.value = Elements.findIndex((element) => element.getAttribute('data-key') === props.modelValue);
  offset.value = 0;
  for (let i = 0; i < ind.value; i++) offset.value += Elements[i].offsetWidth;
  offset.value += Elements[ind.value].offsetWidth / 2;
  return;
};

onMounted(() => {
  if (Element.value) {
    const Elements: HTMLElement[] = [].slice.call(Element.value.children);
    setOffset(Elements);
  }
});

watch(
  () => props.modelValue,
  () => {
    if (Element.value) {
      const Elements: HTMLElement[] = [].slice.call(Element.value.children);
      setOffset(Elements);
    }
  },
);
</script>

<template>
  <div
    flex
    :gap="gap"
    transition-transform-300
    :style="{
      transform: `translateX(calc(50% - ${offset}px - ${(ind * gap) / 4}rem))`,
    }"
    ref="Element"
  >
    <slot />
  </div>
</template>
