<script setup lang="ts" generic="T extends Record<string, SInputProps['modelValue']>">
import { useFloating } from '@floating-ui/vue';
import { debounce } from 'quasar';
import { useField } from 'vee-validate';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SInput, SInputProps } from '../..';

export interface SChooseInputProps<T> {
  modelValue?: T;
  label: SInputProps['label'];
  name: NonNullable<SInputProps['name']>;
  display?: SInputProps['modelValue'];
  items: Array<T & { key: string }>;
  optionValue: keyof T;
}
type ModelValue = SChooseInputProps<T>['modelValue'];

const props = defineProps<SChooseInputProps<T>>();
const emit = defineEmits<{
  'update:modelValue': [ModelValue];
  'update:innerInput': [string];
  open: [];
  close: [];
}>();

const anchor = ref();
const float = ref();
const content = ref<HTMLElement>();
const contentHeight = computed(() => {
  const height = content.value?.getBoundingClientRect().height;
  if (!height) return;
  return `${height * 1.05}px`;
});
const { floatingStyles } = useFloating(anchor, float, {
  placement: 'top-start',
});
const isOpen = ref(false);

const { value, setValue } = useField<Partial<ModelValue>>(() => props.name);

const onItemClick = (val: ModelValue) => {
  close();
  setValue(val);
  emit('update:modelValue', val);
};
const onInput = debounce((val) => {
  emit('update:innerInput', val);
  if (value.value) value.value[props.optionValue] = val;
}, 300);

const open = () => {
  isOpen.value = true;
  emit('open');
};
const close = () => {
  setTimeout(() => {
    isOpen.value = false;
    emit('close');
  }, 100);
};
</script>

<template>
  <div class="s-choose-input" relative w-full @touchstart.stop="">
    <SProxyScroll
      v-if="isOpen"
      class="popup"
      ref="float"
      :style="{ ...floatingStyles, height: contentHeight }"
      right-0
      z-1000
      overflow-hidden
      rounded-0.75rem
      bg-primary
    >
      <div ref="content" flex flex-row rounded-0.75rem>
        <div v-for="item in items" :key="item.key" @click="onItemClick(item)">
          <slot name="item" :item="item" />
        </div>
      </div>
    </SProxyScroll>
    <div>
      <SInput
        ref="anchor"
        @focus="open"
        @blur="close"
        @update:model-value="onInput"
        :label="label"
        watch-model-value
        :model-value="value?.[optionValue as keyof T]"
      />
    </div>
  </div>
</template>
