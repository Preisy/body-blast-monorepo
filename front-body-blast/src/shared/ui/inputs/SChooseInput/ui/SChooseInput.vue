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
  items: Array<T>;
  optionValue: keyof T;
}
type ModelValue = SChooseInputProps<T>['modelValue'];

const props = defineProps<SChooseInputProps<T>>();
const emit = defineEmits<{
  'update:modelValue': [ModelValue];
  'update:innerInput': [string];
}>();

const anchor = ref();
const float = ref();
const content = ref<HTMLElement>();
const contentHeight = computed(() => content.value?.getBoundingClientRect().height + 'px');

const { floatingStyles } = useFloating(anchor, float, {
  placement: 'top-start',
});
const isOpen = ref(false);

const { value, setValue } = useField<ModelValue>(props.name);

const onItemClick = (val: ModelValue) => {
  isOpen.value = false;
  setValue(val);
  emit('update:modelValue', val);
};
const onInput = debounce((val) => emit('update:innerInput', val), 300);
</script>

<template>
  <div class="s-choose-input" relative w-full>
    <SProxyScroll
      v-if="isOpen"
      class="popup"
      ref="float"
      :style="{ ...floatingStyles, height: contentHeight }"
      right-0
      z-1
      overflow-hidden
      rounded-0.75rem
      bg-primary
    >
      <div ref="content" flex rounded-0.75rem>
        <slot name="item" v-for="item in items" :item="item" :onclick="() => onItemClick(item)" />
      </div>
    </SProxyScroll>
    <div>
      <SInput
        @focus="isOpen = true"
        @blur="isOpen = false"
        :label="label"
        ref="anchor"
        :model-value="value?.[optionValue as keyof T]"
        @update:model-value="onInput"
      />
    </div>
  </div>
</template>
