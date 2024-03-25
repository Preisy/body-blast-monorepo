<script setup lang="ts">
import { SplideSlide } from '@splidejs/vue-splide';
</script>

<template>
  <SplideSlide class="slide [&.is-active]:opacity-100!" opacity-50 transition-300>
    <slot />
  </SplideSlide>
</template>
