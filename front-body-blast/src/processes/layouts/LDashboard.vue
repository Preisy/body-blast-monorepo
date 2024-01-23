<script setup lang="ts"></script>

<template>
  <q-layout view="hHh lpr fFf">
    <q-page-container h-screen>
      <RouterView />
    </q-page-container>
    <slot name="footer" />
  </q-layout>
</template>
