<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { useI18n } from 'vue-i18n';
import { z } from 'zod';
import {
  EUserBodyParamsFields,
  ECredentialsSignUpForm,
  EDiseasesSignUpForm,
  EForbiddensSignUpForm,
  EMotivationsSignUpForm,
} from 'entities/user';
import { useAuthStore, TokenService, SignUp } from 'shared/api/auth';
import { ENUMS } from 'shared/lib/enums';
import { SBtn } from 'shared/ui/btns';
import { SForm, SFormProps } from 'shared/ui/form';
import { SSplide } from 'shared/ui/splide';
import { SSplideSlide } from 'shared/ui/splide-slide';
import { SStructure } from 'shared/ui/structure';

const authStore = useAuthStore();
const { t } = useI18n();
const router = useRouter();

const splide = ref<InstanceType<typeof SSplide>>();
const moveNext = () => {
  splide.value?.moveNext();
};

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
        authStore.applyCredentials({
          email: values.email,
          firstName: values.firstname,
          lastName: values.lastname,
          password: values.password,
        });
        moveNext();
      },
    },
  },
  {
    is: EUserBodyParamsFields,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.BodyParams.validation()),
      onSubmit: (values: z.infer<ReturnType<typeof SignUp.BodyParams.validation>>) => {
        authStore.applyBodyParams({
          age: values.age,
          weightInYouth: values.weightInYouth,
          height: values.height,
          weight: values.weight,
        });
        moveNext();
      },
    },
  },
  {
    is: EForbiddensSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()),
      onSubmit: (values) => {
        authStore.applyForbiddens(values);
        moveNext();
      },
    },
  },
  {
    is: EDiseasesSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Diseases.validation()),
      onSubmit: (values) => {
        authStore.applyDiseases(values);
        moveNext();
      },
    },
  },
  {
    is: EMotivationsSignUpForm,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Motivations.validation()),
      onSubmit: async (data) => {
        authStore.applyMotivations(data);
        submitBtnsExceptLast.value.forEach((btn) => btn.click());
        if (!authStore.signUpRequest.email || !authStore.signUpRequest.password) return;

        const signUpResult = await authStore.signUp();
        if (!signUpResult.data) {
          console.error(signUpResult.error);
          return;
        }
        const tokenResponse = await authStore.login({
          email: authStore.signUpRequest.email,
          password: authStore.signUpRequest.password,
        });
        if (authStore.signUpState.state.isSuccess() && tokenResponse.data) {
          TokenService.setTokens(tokenResponse.data);
          router.replace({ name: ENUMS.ROUTES_NAMES.HOME });
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
    <SSplide ref="splide" :options="{ direction: 'ttb', height: '28rem', arrows: false }">
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
