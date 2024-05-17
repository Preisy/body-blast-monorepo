<script setup lang="ts">
import { WAdminDiaryEdit } from 'widgets/diary';
import { AppBaseEntity } from 'shared/api';
import { SStructure } from 'shared/ui';

export interface Props {
  id: AppBaseEntity['id'];
}
defineProps<Props>();
</script>

<template>
  <SStructure>
    <WAdminDiaryEdit />
  </SStructure>
</template>
