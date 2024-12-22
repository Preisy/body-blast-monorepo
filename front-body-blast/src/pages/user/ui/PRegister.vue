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
import { SForm, SStructure, SProxyScroll } from 'shared/ui';

const userStore = useUserStore();
const { t } = useI18n();
const router = useRouter();

const formSections = ref<HTMLDivElement[]>();
const scroll = ref<InstanceType<typeof SProxyScroll>>();

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
  if (!ctx.errors || !formSections.value || !scroll.value) return;

  // Submission context holds all errors
  // We can determine from which slide they are
  // and enforce user to double-check them
  const errorEntries = Object.keys(ctx.errors)
    .map((k) => ({ field: k, page: fieldKeyToSlideMap[k as keyof ValidaionShape] }))
    .sort((a, b) => a.page - b.page);

  const el = formSections.value[errorEntries[0].page];
  scroll.value.setScrollPosition('vertical', el.offsetTop, 200);
  Notify.simpleError(t(`register.errors.incorrectFields`));
};
</script>

<template>
  <SStructure h-full pb-3rem>
    <SProxyScroll ref="scroll" px-1rem>
      <SForm
        :field-schema="registerFieldSchema"
        :loading="false"
        @submit="onSubmit"
        @error="onError"
        class="h-full [&>.s-form-inputs]:h-full p-0!"
        h-full
      >
        <div
          ref="formSections"
          v-for="component in slideComponents"
          :key="component.name"
          mb-1rem
          flex
          flex-col
          gap-y-0.25rem
        >
          <component :is="component" />
        </div>
      </SForm>
    </SProxyScroll>
  </SStructure>
</template>
