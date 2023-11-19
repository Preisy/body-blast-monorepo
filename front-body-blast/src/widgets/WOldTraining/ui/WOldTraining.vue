<script setup lang="ts">
import { symRoundedDelete, symRoundedEdit } from '@quasar/extras/material-symbols-rounded';
import { ETrainingCard } from 'entities/trainings/ETrainingCard';
import { useAdminTrainingStore } from 'shared/api/admin';
import { useLoading } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SReadonlyField } from 'shared/ui/inputs';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';

const { userTraining, getUserTraining } = useAdminTrainingStore();
const { params }: { params: object } = useRoute();
const id = 'id' in params ? (params.id as number) : null;
useLoading(userTraining);
if (id) getUserTraining(id);
</script>

<template>
  <SComponentWrapper>
    <SSplide :options="{ direction: 'ttb', height: '40rem' }">
      <SSplideSlide
        v-if="userTraining.state.isError() || (userTraining.state.isSuccess() && !userTraining.data?.length)"
      >
        <SNoResultsScreen />
      </SSplideSlide>
      <SSplideSlide v-for="(training, index) in userTraining.data" :key="training.name">
        <div flex gap-x-0.5rem v-if="index === 0">
          <!-- TODO: API integration -->
          <SReadonlyField
            :title="$t('admin.prompt.training.cycle')"
            value="2"
            mb-1rem
            bg-accent
            px-1rem
            py-0.75rem
            class="[&>.title]:text-sm [&>.value]:text-base"
          />
          <SBtn :icon="symRoundedEdit" bg="bg!" ml-auto />
          <SBtn :icon="symRoundedDelete" />
        </div>
        <ETrainingCard :training="training" p="0!" />
      </SSplideSlide>
    </SSplide>
  </SComponentWrapper>
</template>
