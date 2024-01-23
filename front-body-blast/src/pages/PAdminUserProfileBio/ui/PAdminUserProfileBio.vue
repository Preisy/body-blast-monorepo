<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { pick } from 'lodash';
import { useI18n } from 'vue-i18n';
import {
  EBodyParamsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/form';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { SignUp } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SForm, SFormProps } from 'shared/ui/SForm';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

const { t } = useI18n();
const props = defineProps<{
  id: string;
}>();

const adminProfileStore = useAdminUserProfileStore();

const currentUser = computed(() => adminProfileStore.currentUser);
const setCurrentUser = adminProfileStore.setCurrentUser;

if (!currentUser.value)
  useLoadingAction(adminProfileStore.getUserProfileResponse, async () => {
    await adminProfileStore.getUserProfile({ id: parseInt(props.id) });
    const user = adminProfileStore.getUserProfileResponse.data?.data;

    if (!user) return; //TODO: 404 screen
    setCurrentUser(user);
  });

const forms: Array<{ is: Component; form: Pick<SFormProps, 'fieldSchema'>; values: Record<string, unknown> }> = [
  {
    is: EBodyParamsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.BodyParams.validation(t)) },
    values: pick(currentUser.value, ['age', 'weightInYouth', 'weight']),
  },
  {
    is: EForbiddensSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()) },
    values: pick(currentUser.value, ['allergy', 'nutritRestrict', 'mealIntolerance']),
  },
  {
    is: EDiseasesSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Diseases.validation()) },
    values: pick(currentUser.value, [
      'gastroDeseases',
      'insulinResistance',
      'kidneyDesease',
      'heartDesease',
      'muscleDesease',
    ]),
  },
  {
    is: EMotivationsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Motivations.validation()) },
    values: pick(currentUser.value, ['loadRestrictions', 'sportsExp', 'goals']),
  },
];
</script>

<template>
  <SStructure h-full py-1rem>
    <SProxyScroll>
      <SBtn :icon="symRoundedClose" ml-0.5rem :to="{ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE }" />
      <div v-for="form in forms" :key="form.is.name" mt-1rem>
        <SForm :readonly="true" :field-schema="form.form.fieldSchema" :init-values="form.values">
          <component :is="form.is" />
        </SForm>
      </div>
    </SProxyScroll>
  </SStructure>
</template>
