<script setup lang="ts">
import { EDietItem } from 'entities/diet/EDietItem';
import { Nutrition } from 'shared/api/nutrition';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

defineProps<Nutrition.Response>();
</script>

<template>
  <SStructure relative>
    <SSplide
      :options="{
        direction: 'ttb',
        height: '15rem',
        fixedHeight: 'auto',
        arrows: false,
        omitEnd: true,
        gap: '2rem',
      }"
      class="[&>ul>li:nth-last-child(2)]:hidden!"
    >
      <SSplideSlide v-for="(panel, index) in data" :key="index">
        <EDietItem v-bind="panel" class="mx-0!" />
      </SSplideSlide>
      <SSplideSlide>
        <div />
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
