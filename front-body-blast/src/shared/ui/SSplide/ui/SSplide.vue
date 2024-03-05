<script setup lang="ts">
import { Splide } from '@splidejs/vue-splide';
export interface SSplideProps {
  options: InstanceType<typeof Splide>['$props']['options'];
}
defineProps<SSplideProps>();
defineEmits(Splide.emits!);

const splide = ref<InstanceType<typeof Splide>>();
defineExpose({
  moveNext() {
    splide.value?.go('>');
  },
  movePrev() {
    splide.value?.go('<');
  },
});
</script>

<template>
  <Splide
    ref="splide"
    @splide:moved="(e, newValue, prevValue, destValue) => $emit('splide:moved', { e, newValue, prevValue, destValue })"
    :options="{ ...options, arrows: false }"
    class="splide [&_.splide\_\_pagination]:(absolute top-1.5rem flex flex-col justify-start text-0) [&_.splide\_\_pagination\_\_page]:(m-0 mb-4px h-6px w-6px opacity-100) [&_.splide\_\_pagination\_\_page.is-active]:(scale-100 bg-primary) [&_.splide\_\_track]:overflow-visible [&_.splide\_\_track]:overflow-visible"
  >
    <slot />
  </Splide>
</template>
