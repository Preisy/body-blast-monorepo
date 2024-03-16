<script setup lang="ts">
import { symRoundedClose, symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { toTypedSchema } from '@vee-validate/zod';
import { assign, pick } from 'lodash';
import {
  EBodyParamsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/form';
import { SignUp } from 'shared/api/auth';
import { Me, useMeStore } from 'shared/api/me';
import { ENUMS } from 'shared/lib/enums';
import { useLoadingAction } from 'shared/lib/loading';
import { SBtn } from 'shared/ui/btns';
import { SForm, SFormProps } from 'shared/ui/SForm';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

const { me, getMe, patchMe } = useMeStore();
const data = computed(() => me.data?.data);
if (!data.value) useLoadingAction(me, () => getMe());
const router = useRouter();

const forms: Array<{ is: Component; form: Pick<SFormProps, 'fieldSchema'>; values: Record<string, unknown> }> = [
  {
    is: EBodyParamsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.BodyParams.validation()) },
    values: pick(data.value, ['age', 'weightInYouth', 'weight', 'height']),
  },
  {
    is: EForbiddensSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()) },
    values: pick(data.value, ['allergy', 'nutritRestrict', 'mealIntolerance']),
  },
  {
    is: EDiseasesSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Diseases.validation()) },
    values: pick(data.value, ['gastroDeseases', 'insulinResistance', 'kidneyDesease', 'heartDesease', 'muscleDesease']),
  },
  {
    is: EMotivationsSignUpForm,
    form: { fieldSchema: toTypedSchema(SignUp.Motivations.validation()) },
    values: pick(data.value, ['loadRestrictions', 'sportsExp', 'goals']),
  },
];

const formsRef = ref<Array<InstanceType<typeof SForm>>>();
const updatedUserData = ref<Me.Patch.Dto>({});

const patchUser = async () => {
  if (!formsRef.value) return;
  for (const form of formsRef.value) {
    await form.handleSubmit((formValues) => assign(updatedUserData.value, formValues))();
  }
  await patchMe(updatedUserData.value);
  router.push({ name: ENUMS.ROUTES_NAMES.PROFILE });
};
</script>

<template>
  <SStructure h-full py-1rem>
    <SProxyScroll>
      <SBtn :icon="symRoundedClose" ml-0.5rem :to="{ name: ENUMS.ROUTES_NAMES.PROFILE }" />
      <div v-for="(form, index) in forms" :key="form.is.name" mt-1rem>
        <SForm ref="formsRef" :field-schema="form.form.fieldSchema" :init-values="form.values" @submit="patchUser">
          <component :is="form.is" />
          <template #submit-btn>
            <SBtn
              v-if="index === forms.length - 1"
              :icon="symRoundedDone"
              :loading="me.updateState.isLoading()"
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
