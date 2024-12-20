<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { InvalidSubmissionContext } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import {
  EUserBodyParamsFields,
  EUserCredentialsFields,
  EUserDiseasesFields,
  EUserForbiddensFields,
  EUserMotivationsFields,
} from 'entities/user';
import { useUserStore, SignUp } from 'shared/api';
import { ENUMS, Notify } from 'shared/lib';
import { SBtn, SForm, SSplide, SStructure, SSplideSlide } from 'shared/ui';

const userStore = useUserStore();
const { t } = useI18n();
const router = useRouter();

const splide = ref<InstanceType<typeof SSplide>>();
const moveNext = () => {
  splide.value?.moveNext();
};

const slideComponents: Array<Component> = [
  EUserCredentialsFields,
  EUserBodyParamsFields,
  EUserForbiddensFields,
  EUserDiseasesFields,
  EUserMotivationsFields,
];
type ValidaionShape = z.infer<ReturnType<typeof SignUp.validation>>;
const fieldKeyToSlideMap: Record<keyof ValidaionShape, number> = Object.fromEntries(
  [
    SignUp.Credentials.validation,
    SignUp.BodyParams.validation,
    SignUp.Forbiddens.validation,
    SignUp.Diseases.validation,
    SignUp.Motivations.validation,
  ]
    .map((v) => v(t))
    .map((obj) => ('innerType' in obj ? obj.innerType().shape : obj.shape))
    .map((shape, i) => Object.keys(shape).map((k) => [k, i]))
    .flat(),
);

const registerFieldSchema = toTypedSchema(SignUp.validation(t));
const onSubmit = async (values: ValidaionShape) => {
  const signUpResult = await userStore.signUp({
    ...values,
    firstName: values.firstname,
    lastName: values.lastname,
  });

  if (!signUpResult.data) {
    console.error(signUpResult.error);
    return;
  }
  const tokenResponse = await userStore.login({
    email: values.email,
    password: values.password,
  });
  if (userStore.signUpState.state.isSuccess() && tokenResponse.data) {
    router.replace({ name: ENUMS.ROUTES_NAMES.HOME });
  }
};

const onError = (ctx: InvalidSubmissionContext) => {
  if (!ctx.errors || !splide.value) return;

  // Submission context holds all errors
  // We can determine from which slide they are
  // and enforce user to double-check them
  const errorEntries = Object.keys(ctx.errors)
    .map((k) => ({ field: k, page: fieldKeyToSlideMap[k as keyof ValidaionShape] }))
    .sort((a, b) => a.page - b.page);

  splide.value.moveTo(errorEntries[0].page);
  Notify.simpleError(t(`register.errors.incorrectFields`));
};
</script>

<template>
  <SStructure relative>
    <SForm
      :field-schema="registerFieldSchema"
      :loading="false"
      @submit="onSubmit"
      @error="onError"
      disable-submit-btn
      class="p-0!"
    >
      <SSplide ref="splide" :options="{ direction: 'ttb', height: '28rem', arrows: false }" class="p-1.5rem!">
        <SSplideSlide v-for="(component, idx) in slideComponents" :key="component.name" flex flex-col gap-y-0.25rem>
          <component :is="component" />
          <SBtn v-if="idx != slideComponents.length - 1" icon="done" @click="moveNext" mt-0.5rem self-end />
          <SBtn v-else icon="done" type="submit" mt-0.5rem self-end />
        </SSplideSlide>
      </SSplide>
    </SForm>
  </SStructure>
</template>
