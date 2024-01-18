<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import {
  EBodyParamsSignUpForm,
  ECredentialsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/form';
import { useAuthStore, TokenService, SignUp } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/btns';
import { SForm, SFormProps } from 'shared/ui/SForm';
import { SSplide } from 'shared/ui/SSplide';
import { SSplideSlide } from 'shared/ui/SSplideSlide';
import { SStructure } from 'shared/ui/SStructure';

const authStore = useAuthStore();
const { t } = useI18n();
const router = useRouter();

type RegisterSlides = Array<{
  is: Component;
  formProps: Omit<SFormProps, 'loading'> & { loading?: Ref<SFormProps['loading']> } & Pick<
      InstanceType<typeof SForm>,
      'onSubmit'
    >;
}>;

const slides: RegisterSlides = [
  {
    is: ECredentialsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Credentials.validation(t)),
      onSubmit: (values: z.infer<ReturnType<typeof SignUp.Credentials.validation>>) => {
        const [firstName, lastName] = values.username.split(' ');
        authStore.applyCredentials({
          email: values.email,
          firstName,
          lastName,
          password: values.password,
        });
      },
    },
  },
  {
    is: EBodyParamsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.BodyParams.validation(t)),
      onSubmit: (values: z.infer<ReturnType<typeof SignUp.BodyParams.validation>>) => {
        const [weight, height] = values.weightAndHeight.split('/');
        authStore.applyBodyParams({
          age: values.age,
          weightInYouth: values.weightInYouth,
          height: parseFloat(height),
          weight: parseFloat(weight),
        });
      },
    },
  },
  {
    is: EForbiddensSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()),
      onSubmit: authStore.applyForbiddens,
    },
  },
  {
    is: EDiseasesSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Diseases.validation()),
      onSubmit: authStore.applyDiseases,
    },
  },
  {
    is: EMotivationsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Motivations.validation()),
      onSubmit: async (data) => {
        authStore.applyMotivations(data);
        submitBtnsExceptLast.value.forEach((btn) => btn.click());
        const tokenResponse = await authStore.signUp();
        if (authStore.signUpState.state.isSuccess() && tokenResponse.data) {
          TokenService.setTokens(tokenResponse.data);
          router.push({ name: ENUMS.ROUTES_NAMES.HOME });
        }
      },
    },
  },
];

const submitBtns = ref<Array<InstanceType<typeof SBtn>>>([]);
const submitForms = ref<Array<InstanceType<typeof SForm>>>([]);
const submitBtnsExceptLast = computed(() => submitBtns.value.slice(0, -1));
</script>

<template>
  <SStructure relative>
    <SSplide :options="{ direction: 'ttb', height: '28rem', arrows: false }">
      <SSplideSlide v-for="(slide, index) in slides" :key="index">
        <SForm v-bind="slide.formProps" :loading="false" ref="submitForms">
          <component :is="slide.is" />
          <template #submit-btn>
            <SBtn
              ref="submitBtns"
              icon="done"
              type="submit"
              :loading="index === slides.length - 1 ? authStore.signUpState.state.isLoading() : false"
              @click="(event) => submitForms[index].handleSubmit(slides[index].formProps.onSubmit!)(event)"
              mt-0.5rem
              self-end
            />
          </template>
        </SForm>
      </SSplideSlide>
    </SSplide>
  </SStructure>
</template>
