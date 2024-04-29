<script setup lang="ts">
import moment from 'moment';
import { useI18n } from 'vue-i18n';
import { FRemoveDialog } from 'features/dialogs';
import { EAthropometricsItem, EUnitedProfileCard } from 'entities/profile/';
import { useAdminUserProfileStore, useAdminAnthropometryStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { User } from 'shared/api/user';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { fromCreatedToToday, getUTC3Date, isEqualDates } from 'shared/lib/utils';
import { SBtn, SBtnToggle } from 'shared/ui/btns';
import { SCalendar } from 'shared/ui/calendar';
import { SComponentWrapper } from 'shared/ui/component-wrapper';
import { SDatePagination } from 'shared/ui/date-pagination';
import { SScaffold } from 'shared/ui/scaffold';
import { SStructure } from 'shared/ui/structure';

export interface PAdminUserProfileProps {
  id: AppBaseEntity['id'];
}

const today = getUTC3Date();

const props = defineProps<PAdminUserProfileProps>();
const { t } = useI18n();

const { user, getUserById, patchUserProfile } = useAdminUserProfileStore();
const router = useRouter();
const userData = computed(() => user.data?.data);

if (!userData.value)
  useLoadingAction(user, async () => {
    await getUserById({ id: props.id });

    if (!userData.value) {
      router.push({ name: ENUMS.ROUTES_NAMES.NOT_FOUND });
      return;
    }
  });

const userName = computed(() => `${userData.value?.firstName} ${userData.value?.lastName}`);

const canWatchVideo = computed(() => userData.value?.canWatchVideo);
const anthrpJobPeriod = computed(() => userData.value?.anthrpJobPeriod);

const updateUserField = async (field: keyof Pick<User, 'canWatchVideo' | 'anthrpJobPeriod'>, newValue: boolean) =>
  patchUserProfile({ id: props.id, user: { [field]: newValue } });

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

const date = ref(today.format('YYYY-MM-DD'));
const halfRange = ref(3);
const offset = ref(0);
const { anthropometryList, getAnthropometry } = useAdminAnthropometryStore();
useLoadingAction(anthropometryList, () =>
  getAnthropometry({
    userId: props.id,
    from: moment(date.value).subtract(halfRange.value, 'd').format('YYYY-MM-DD'),
    to: moment(date.value).add(halfRange.value, 'd').format('YYYY-MM-DD'),
  }),
);
const slides = computed(() => anthropometryList.data?.data);

const { deleteUser, users } = useAdminUserProfileStore();
const deletionDialog = ref<InstanceType<typeof FRemoveDialog>>();
const userIdToDelete = ref<User['id']>();
const onDeletionApply = () => {
  useLoadingAction(users.deleteState, () => {
    if (!userIdToDelete.value) return;
    deleteUser({ id: userIdToDelete.value });
  });
  router.push({ name: ENUMS.ROUTES_NAMES.ADMIN.HOME });
};
const onUserDelete = (userId: User['id']) => {
  userIdToDelete.value = userId;
  deletionDialog.value?.show();
};
</script>

<template>
  <SStructure h-full>
    <SScaffold>
      <template #header>
        <EUnitedProfileCard
          :header="userName ?? $t('global.loading')"
          :describe="$t('home.profile.header.student')"
          dark
          mx--0.5rem
          px-2rem
          pt-4rem
        >
          <template #action>
            <div flex flex-row justify-between>
              <SBtn icon="sym_r_help" bg="bg!" :to="{ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE_BIO }" />
              <SBtn icon="sym_r_delete" @click="onUserDelete(id)" />
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
          <SCalendar
            :model-value="date"
            @update:model-value="(newDate) => (date = newDate.split('/').join('-'))"
            :options="(date) => fromCreatedToToday(date)"
          />
          <SDatePagination
            v-model="date"
            :half-range="halfRange"
            :offset="offset"
            @need-fetch="(from, to) => getAnthropometry({ userId: id, from, to, expanded: true })"
            h="16rem!"
          >
            <template #item="{ date: dd }">
              <EAthropometricsItem
                v-if="slides && slides.find((slide) => isEqualDates(slide.createdAt, dd))"
                :profile="slides.find((slide) => isEqualDates(slide.createdAt, dd))!"
                p="0!"
                readonly
                pointer-events-none
                select-none
              />
            </template>
          </SDatePagination>
        </div>
      </template>
    </SScaffold>

    <FRemoveDialog ref="deletionDialog" @apply="onDeletionApply" />
  </SStructure>
</template>
