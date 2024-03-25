<script setup lang="ts">
import { symRoundedClose } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { pick } from 'lodash';
import {
  EBodyParamsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/form';
import { useAdminUserProfileStore } from 'shared/api/admin';
import { SignUp } from 'shared/api/auth';
import { AppBaseEntity } from 'shared/api/base';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SForm, SFormProps } from 'shared/ui/SForm';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

const props = defineProps<{
  id: AppBaseEntity['id'];
}>();

const router = useRouter();
const { getUserById, user } = useAdminUserProfileStore();
const userData = computed(() => user.data?.data);
if (!userData.value)
  useLoadingAction(user, async () => {
    await getUserById({ id: props.id });

    if (!userData.value) {
      router.push({ name: ENUMS.ROUTES_NAMES.NOT_FOUND });
      return;
    }
  });

const forms: Array<{ is: Component; form: Pick<SFormProps, 'fieldSchema'>; values: Record<string, unknown> }> = [
  {
    is: EBodyParamsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.BodyParams.validation()) },
    values: pick(userData.value, ['age', 'weightInYouth', 'weight', 'height']),
  },
  {
    is: EForbiddensSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()) },
    values: pick(userData.value, ['allergy', 'nutritRestrict', 'mealIntolerance']),
  },
  {
    is: EDiseasesSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Diseases.validation()) },
    values: pick(userData.value, [
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
    values: pick(userData.value, ['loadRestrictions', 'sportsExp', 'goals']),
  },
];
</script>

<template>
  <SStructure h-full py-1rem>
    <SProxyScroll>
      <SBtn :icon="symRoundedClose" ml-0.5rem :to="{ name: ENUMS.ROUTES_NAMES.ADMIN.USER_PROFILE }" />
      <div v-for="form in forms" :key="form.is.name" mt-1rem>
        <SForm :readonly="true" :field-schema="form.form.fieldSchema" :init-values="form.values">
          <component :is="form.is" :readonly="true" />
        </SForm>
      </div>
    </SProxyScroll>
  </SStructure>
</template>
