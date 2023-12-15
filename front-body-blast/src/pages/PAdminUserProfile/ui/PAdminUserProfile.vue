<script setup lang="ts">
import { merge } from 'lodash';
import moment, { Moment } from 'moment';
import { useI18n } from 'vue-i18n';
import { EAthropometricsItem } from 'entities/profile/EAthropometricsItem';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminHomeStore, useAdminUserProfileStore } from 'shared/api/admin';
import { useProfileStore } from 'shared/api/profile';
import { User } from 'shared/api/user';
import { ENUMS } from 'shared/lib/enums';
import { useLoading, useLoadingAction } from 'shared/lib/loading';
import { SBtn, SBtnToggle } from 'shared/ui/btns';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SPaginationSlider } from 'shared/ui/SPaginationSlider';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminUserProfileProps {
  id: string;
}
const props = defineProps<PAdminUserProfileProps>();
const { t } = useI18n();

const adminProfileStore = useAdminHomeStore();

const currentUser = computed(() => useAdminUserProfileStore().currentUser);
const setCurrentUser = useAdminUserProfileStore().setCurrentUser;

if (!currentUser.value)
  useLoadingAction(adminProfileStore.clientProfiles, async () => {
    await adminProfileStore.getUserProfiles();
    const user = adminProfileStore.clientProfiles.data?.data.find((user) => user.id.toString() === props.id);
    console.log(user);
    if (!user) return; //TODO: 404 screen
    setCurrentUser(user);
  });

const currentUserName = computed(() => `${currentUser.value?.firstName} ${currentUser.value?.lastName}`);

const canWatchVideo = computed(() => currentUser.value?.canWatchVideo);
const anthrpJobPeriod = computed(() => currentUser.value?.anthrpJobPeriod);

useLoading(adminProfileStore.patchUserResponse);
const updateUserField = (field: keyof Pick<User, 'canWatchVideo' | 'anthrpJobPeriod'>, newValue: boolean) =>
  adminProfileStore.patchUserProfile(props.id, { [field]: newValue }); // TODO: 400 Bad Request - написать беку

const canWatchVideoOptions = [
  { value: false, label: t('admin.detailed.accessToggle.disable') },
  { value: true, label: t('admin.detailed.accessToggle.enable') },
];
const anthrpJobPeriodOptions = [
  { value: 3, label: '3' },
  { value: 7, label: '7' },
  { value: 10, label: '10' },
  { value: 14, label: '14' },
];

const { anthropometry, getAnthropometry } = useProfileStore();

const index = ref(0);
const lock = computed(() => anthropometry.state.isLoading());
const slides = computed(
  () =>
    anthropometry.data?.data
      .filter((slide) => slide.userId.toString() === props.id)
      .map((slide) => merge(slide, { name: slide.id.toString() })) ?? null,
);

const date = ref<Moment>(moment());
const update = (direction: 'back' | 'front', createdAt: string = date.value.toISOString()) => {
  let from = createdAt;
  let to = createdAt;

  if (direction === 'back') {
    date.value.subtract(2, 'w');
    from = date.value.toISOString();
  } else {
    date.value.add(2, 'w');
    to = date.value.toISOString();
  }

  console.log({ from, to });
  return getAnthropometry({ from, to });
};
useLoadingAction(anthropometry, () => update('back'));
</script>

<template>
  <SStructure h-full>
    <SWithHeaderLayout>
      <template #header>
        <EUnitedProfileCard
          :header="currentUserName ?? 'Loading...'"
          :describe="$t('home.profile.header.student')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <div flex flex-row justify-between>
              <SBtn icon="sym_r_help" bg="bg!" :to="{ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO }" />
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
            :model-value="canWatchVideo"
            @update:model-value="(value: boolean) => updateUserField('canWatchVideo', value)"
            :options="canWatchVideoOptions"
          />
          <p mb-0.5rem mt-1rem>{{ $t('admin.detailed.anthropometryTitle') }}</p>
          <SBtnToggle
            :model-value="anthrpJobPeriod"
            @update:model-value="(value: boolean) => updateUserField('anthrpJobPeriod', value)"
            :options="anthrpJobPeriodOptions"
          />
        </SComponentWrapper>

        <div>
          <SCalendar v-model="date" />
          <SPaginationSlider
            :slides="slides"
            :lock="lock"
            v-model="index"
            @first-element="() => update('back')"
            @last-element="() => update('front')"
          >
            <EAthropometricsItem
              v-if="slides"
              :profile="slides[index]"
              p="0!"
              readonly
              pointer-events-none
              select-none
            />
          </SPaginationSlider>
        </div>
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
