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

const { getUserById, user, currentUser, setCurrentUser } = useAdminUserProfileStore();

if (!currentUser)
  useLoadingAction(user, async () => {
    await getUserById({ id: parseInt(props.id) });
    const userData = user.data?.data;

    if (!userData) return; //TODO: 404 screen
    setCurrentUser(userData);
  });

const forms: Array<{ is: Component; form: Pick<SFormProps, 'fieldSchema'>; values: Record<string, unknown> }> = [
  {
    is: EBodyParamsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.BodyParams.validation(t)) },
    values: pick(currentUser, ['age', 'weightInYouth', 'weight']),
  },
  {
    is: EForbiddensSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Forbiddens.validation(t)) },
    values: pick(currentUser, ['allergy', 'nutritRestrict', 'mealIntolerance']),
  },
  {
    is: EDiseasesSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Diseases.validation(t)) },
    values: pick(currentUser, [
      'gastroDeseases',
      'insulinResistance',
      'kidneyDesease',
      'heartDesease',
      'muscleDesease',
    ]),
  },
  {
    is: EMotivationsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Motivations.validation(t)) },
    values: pick(currentUser, ['loadRestrictions', 'sportsExp', 'goals']),
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
