<script setup lang="ts">
import { QBtnToggle, QBtnToggleProps, Screen } from 'quasar';
import { HTMLAttributes } from 'vue';

export interface SBtnToggleProps extends QBtnToggleProps {}
const props = defineProps<SBtnToggleProps>();
const emit = defineEmits<{
  'update:model-value': [newValue: boolean];
}>();

//modelValue wrapper
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:model-value', value);
  },
});

const toggle = ref<InstanceType<typeof QBtnToggle>>();
const elemsAsArray = computed(() => {
  if (!toggle.value) return;
  const html: HTMLElement = toggle.value.$el;
  const elements = html.querySelectorAll('button');

  return Array.from(elements);
}); //styles for moving black elemnt

const styles = computed(() => {
  if (!toggle.value || !elemsAsArray.value) return;
  Screen.width;
  const parentBox = toggle.value.$el.getBoundingClientRect();
  const boundingRects = elemsAsArray.value.map((elem) => elem.getBoundingClientRect());

  return boundingRects?.map(
    (rect) =>
      ({
        width: `${rect.width}px`,
        marginLeft: `${rect.left - parentBox.left}px`,
      }) as HTMLAttributes['style'],
  );
});

const currentIndex = computed(() => props.options.findIndex((option) => option.value === value.value));
const currentStyle = computed(() => styles.value?.[currentIndex.value]);
</script>

<template>
  <div relative>
    <QBtnToggle
      ref="toggle"
      class="toggle [&_.q-btn]:(relative z-1 rounded-1rem!) [&_span]:(text-base capitalize)"
      v-bind="$props"
      flat
      relative
      w-full
      flex
      justify-between
      rounded-0.75rem
      bg="primary/50"
      toggle-color="primary"
      text-color="bg"
      toggle-text-color="bg"
      size="1rem"
    />

    <div
      :style="currentStyle"
      absolute
      top-0
      z-0
      h-full
      rounded-0.75rem
      bg-black
      ease-in-out
      class="transition-width,margin,transform-300"
    />
  </div>
</template>

<style scoped lang="scss">
.toggle {
  &:deep([aria-pressed='true']) {
    span {
      font-weight: bold !important;
    }
  }
  &:deep(span) {
    transition: 300ms all ease-in-out;
  }
}
</style>
