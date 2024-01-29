<script setup lang="ts">
import { EAthropometricsItem } from 'entities/profile/EAthropometricsItem';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminProfileStore } from 'shared/api/admin';
import { useProfileStore } from 'shared/api/profile';
import { ENUMS } from 'shared/lib/enums';
import { useLoading } from 'shared/lib/loading';
import { SBtn, SBtnToggle } from 'shared/ui/btns';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SPaginationSlider } from 'shared/ui/SPaginationSlider';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

const id = parseInt(useRoute().params.id as string);
const adminProfileStore = useAdminProfileStore();
useLoading(adminProfileStore.clientProfiles);
if (!adminProfileStore.clientProfiles.state.isSuccess())
  adminProfileStore.getUserProfiles({ page: 1, limit: 1000, expanded: false });

const me = computed(() => adminProfileStore.clientProfiles.data?.data.find((client) => client.id === id));
const myName = computed(() => (me.value ? `${me.value.firstName} ${me.value.lastName}` : 'Loading...'));

const accessToLearning = ref<boolean>(false);
const diaryInterval = ref<number>(3);

const profileStore = useProfileStore();
const { anthropometry } = profileStore;
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          v-bind="$props"
          :header="myName"
          :describe="$t('home.profile.header.student')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <div flex flex-row justify-between>
              <SBtn icon="sym_r_help" bg="bg!" :to="{ name: ENUMS.ROUTES_NAMES.ADMIN_USER_PROFILE_BIO }" />
              <SBtn icon="sym_r_delete" />
            </div>
          </template>
        </EUnitedProfileCard>
      </template>
      <template #body>
        <SComponentWrapper py-1.5rem>
          <!-- Access to learning section -->
          <p mb-0.5rem>{{ $t('admin.detailed.accessTitle') }}</p>
          <SBtnToggle
            v-model="accessToLearning"
            :options="[
              { value: false, label: $t('admin.detailed.accessToggle.disable') },
              { value: true, label: $t('admin.detailed.accessToggle.enable') },
            ]"
          />
          <p mb-0.5rem mt-1rem>{{ $t('admin.detailed.anthropometryTitle') }}</p>
          <SBtnToggle
            v-model="diaryInterval"
            :options="[
              { value: 3, label: '3' },
              { value: 7, label: '7' },
              { value: 10, label: '10' },
              { value: 14, label: '14' },
              { value: 20, label: '20' },
            ]"
          />
        </SComponentWrapper>

        <SPaginationSlider
          :count="10"
          :user-select-none="true"
          :fetch="profileStore.getAnthropometry"
          :slide-component="EAthropometricsItem"
          :state="anthropometry"
        />
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
