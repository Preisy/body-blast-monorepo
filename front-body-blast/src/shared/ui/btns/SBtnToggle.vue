<script setup lang="ts">
import { QBtnToggle, QBtnToggleProps } from 'quasar';
import { useField } from 'vee-validate';
import { HTMLAttributes } from 'vue';

export interface SBtnToggleProps {
  name?: string;
  readonly?: boolean;
  options: QBtnToggleProps['options'];
  initValue?: number;
  modelValue?: number | boolean | null;
}
const props = defineProps<SBtnToggleProps>();
const emit = defineEmits<{
  'update:model-value': [newValue: boolean];
}>();

const { value, setValue } = useField<number | undefined | null>(() => props.name ?? '_');
if (props.initValue) setValue(props.initValue);

const toggle = ref<InstanceType<typeof QBtnToggle>>();
const elemsAsArray = computed(() => {
  if (!toggle.value) return;
  const html: HTMLElement = toggle.value.$el;
  const elements = html.querySelectorAll('button');

  return Array.from(elements);
}); //styles for moving black elemnt

const isParentHidden = ref<boolean>();
const styles = computed(() => {
  if (isParentHidden.value) return;
  if (!toggle.value || !elemsAsArray.value) return;
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

const currentIndex = computed(() =>
  props.options.findIndex((option) => (props.name ? option.value === value.value : option.value === props.modelValue)),
);
const currentStyle = computed(() => styles.value?.[currentIndex.value]);
const onResize = (size: { height: number; width: number }) => (isParentHidden.value = !size.height && !size.width);
</script>

<template>
  <div relative>
    <q-resize-observer @resize="onResize" />
    <q-btn-toggle
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
      :model-value="name ? value : modelValue"
      @update:model-value="
        (val) => {
          if (name) {
            setValue(val);
          }
          emit('update:model-value', val);
        }
      "
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
