<script setup lang="ts">
export interface SFooterNavLinkProps {
  imgSrc: string;
  title: string;
  name: string;
}
defineProps<SFooterNavLinkProps>();
</script>

<template>
  <q-route-tab
    :ripple="false"
    :to="{ name: name }"
    exact-active-class="opacity-100! [&_span]:fw-800!"
    exact
    class="px-0!"
    w-full
    px-0
    opacity-20
    transition-opacity-300
  >
    <div max-w-5rem flex flex-1 flex-col items-center justify-center gap-0.5rem py-1rem text-center>
      <q-icon :name="imgSrc" text-md text-primary size="1.5rem" />
      <span normal-case text-primary>{{ title }}</span>
    </div>
  </q-route-tab>
</template>
