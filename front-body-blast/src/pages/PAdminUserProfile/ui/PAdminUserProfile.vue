<script setup lang="ts">
import { merge } from 'lodash';
import moment, { Moment } from 'moment';
import { useI18n } from 'vue-i18n';
import { EAthropometricsItem } from 'entities/profile/EAthropometricsItem';
import { EUnitedProfileCard } from 'entities/profile/EUnitedProfileCard';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { useProfileStore } from 'shared/api/profile';
import { User } from 'shared/api/user';
import { ENUMS } from 'shared/lib/enums';
import { useLoading, useLoadingAction } from 'shared/lib/loading';
import { SBtn, SBtnToggle } from 'shared/ui/btns';
import { SCalendar } from 'shared/ui/SCalendar';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SPaginationSlider } from 'shared/ui/SPaginationSlider';
import { SStructure } from 'shared/ui/SStructure';
import { SWithHeaderLayout } from 'shared/ui/SWithHeaderLayout';

export interface PAdminUserProfileProps {
  id: string;
}
const props = defineProps<PAdminUserProfileProps>();
const { t } = useI18n();

const adminProfileStore = useAdminUserProfileStore();

const currentUser = computed(() => adminProfileStore.currentUser);
const setCurrentUser = adminProfileStore.setCurrentUser;

const router = useRouter();

if (!currentUser.value)
  useLoadingAction(adminProfileStore.getUserProfileResponse, async () => {
    await adminProfileStore.getUserProfile({ id: parseInt(props.id) });
    const user = adminProfileStore.getUserProfileResponse.data?.data;

    if (!user) {
      router.push({ name: ENUMS.ROUTES_NAMES.NOT_FOUND });
      return;
    }
    setCurrentUser(user);
  });

const currentUserName = computed(() => `${currentUser.value?.firstName} ${currentUser.value?.lastName}`);

const canWatchVideo = computed(() => currentUser.value?.canWatchVideo);
const anthrpJobPeriod = computed(() => currentUser.value?.anthrpJobPeriod);

useLoading(adminProfileStore.patchUserResponse);
const updateUserField = async (field: keyof Pick<User, 'canWatchVideo' | 'anthrpJobPeriod'>, newValue: boolean) => {
  await adminProfileStore.patchUserProfile(props.id, { [field]: newValue }); // TODO: 400 Bad Request - написать беку
  const user = adminProfileStore.patchUserResponse.data?.data;

  if (!user) {
    router.push({ name: ENUMS.ROUTES_NAMES.NOT_FOUND });
    return;
  }
  setCurrentUser(user);
};

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
const dateISOString = computed(() => date.value.toISOString());
const updateDate = (newValue: string) => {
  const val = newValue.split('/').join('-');
  date.value = moment(val);

  const from = date.value.clone().subtract(2, 'w').toISOString();
  const to = dateISOString.value;

  getAnthropometry({ from, to });
};

const update = (direction: 'back' | 'front', createdAt: string = date.value.toISOString()) => {
  let from = createdAt;
  let to = createdAt;

  if (direction === 'back') {
    date.value.subtract(2, 'w');
    from = dateISOString.value;
  } else {
    date.value.add(2, 'w');
    to = dateISOString.value;
  }

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
          <SCalendar :model-value="dateISOString" @update:model-value="updateDate" />
          <SPaginationSlider
            v-if="slides && slides.length"
            :slides="slides"
            :lock="lock"
            v-model="index"
            @first-element="() => update('back')"
            @last-element="() => update('front')"
          >
            <EAthropometricsItem :profile="slides[index]" p="0!" readonly pointer-events-none select-none />
          </SPaginationSlider>
          <SNoResultsScreen v-else p-1.5rem />
        </div>
      </template>
    </SWithHeaderLayout>
  </SStructure>
</template>
