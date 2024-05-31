<script setup lang="ts">
import { WAdminDiaryEdit } from 'widgets/diary';
import { User } from 'shared/api';
import { SStructure } from 'shared/ui';

export interface Props {
  id: User['id'];
}
defineProps<Props>();
</script>

<template>
  <SStructure>
    <WAdminDiaryEdit :id="id" />
  </SStructure>
</template>
