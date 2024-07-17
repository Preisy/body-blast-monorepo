<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { assign, pick } from 'lodash';
import {
  EUserBodyParamsFields,
  EUserForbiddensFields,
  EUserDiseasesFields,
  EUserMotivationsFields,
} from 'entities/user';
import { User, useUserStore, SignUp } from 'shared/api';
import { ENUMS, useLoadingAction } from 'shared/lib';
import { SBtn, SForm, SFormProps, SStructure, SProxyScroll } from 'shared/ui';

const { user, getUser, patchUser } = useUserStore();
const data = computed(() => user.data?.data);
if (!data.value) useLoadingAction(user, () => getUser());
const router = useRouter();

const forms: Array<{ is: Component; form: Pick<SFormProps, 'fieldSchema'>; values: Record<string, unknown> }> = [
  {
    is: EUserBodyParamsFields,
    form: { fieldSchema: toTypedSchema(SignUp.BodyParams.validation()) },
    values: pick(data.value, ['age', 'weightInYouth', 'weight', 'height']),
  },
  {
    is: EUserForbiddensFields,
    form: { fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()) },
    values: pick(data.value, ['allergy', 'nutritRestrict', 'mealIntolerance']),
  },
  {
    is: EUserDiseasesFields,
    form: { fieldSchema: toTypedSchema(SignUp.Diseases.validation()) },
    values: pick(data.value, ['gastroDeseases', 'insulinResistance', 'kidneyDesease', 'heartDesease', 'muscleDesease']),
  },
  {
    is: EUserMotivationsFields,
    form: { fieldSchema: toTypedSchema(SignUp.Motivations.validation()) },
    values: pick(data.value, ['loadRestrictions', 'sportsExp', 'goals']),
  },
];

const formsRef = ref<Array<InstanceType<typeof SForm>>>();
const updatedUserData = ref<User.Patch.Dto>({});

const patch = async () => {
  if (!formsRef.value) return;
  for (const form of formsRef.value) {
    await form.handleSubmit((formValues) => assign(updatedUserData.value, formValues))();
  }
  await patchUser(updatedUserData.value);
  router.push({ name: ENUMS.ROUTES_NAMES.PROFILE });
};
</script>

<template>
  <SStructure h-full py-1rem>
    <SProxyScroll>
      <SBtn :icon="symRoundedClose" :to="{ name: ENUMS.ROUTES_NAMES.PROFILE }" fixed z-999 ml-0.5rem />
      <div v-for="(form, index) in forms" :key="form.is.name" mt-1rem>
        <SForm ref="formsRef" :field-schema="form.form.fieldSchema" :init-values="form.values" @submit="patch">
          <component :is="form.is" />
          <template #submit-btn>
            <SBtn
              v-if="index === forms.length - 1"
              :icon="symRoundedDone"
              :loading="user.updateState.isLoading()"
              type="submit"
              mt-0.5rem
              self-end
            />
          </template>
        </SForm>
      </div>
    </SProxyScroll>
  </SStructure>
</template>
