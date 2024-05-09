<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
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
import { ENUMS } from 'shared/lib';
import { SBtn, SForm, SFormProps, SSplide, SStructure, SSplideSlide } from 'shared/ui';

const userStore = useUserStore();
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
    is: EUserCredentialsFields,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Credentials.validation(t)),
      onSubmit: (values: z.infer<ReturnType<typeof SignUp.Credentials.validation>>) => {
        userStore.applyCredentials({
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
        userStore.applyBodyParams({
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
    is: EUserForbiddensFields,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Forbiddens.validation()),
      onSubmit: (values) => {
        userStore.applyForbiddens(values);
        moveNext();
      },
    },
  },
  {
    is: EUserDiseasesFields,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Diseases.validation()),
      onSubmit: (values) => {
        userStore.applyDiseases(values);
        moveNext();
      },
    },
  },
  {
    is: EUserMotivationsFields,
    formProps: {
      fieldSchema: toTypedSchema(SignUp.Motivations.validation()),
      onSubmit: async (data) => {
        userStore.applyMotivations(data);
        submitBtnsExceptLast.value.forEach((btn) => btn.click());
        if (!userStore.signUpRequest.email || !userStore.signUpRequest.password) return;

        const signUpResult = await userStore.signUp();
        if (!signUpResult.data) {
          console.error(signUpResult.error);
          return;
        }
        const tokenResponse = await userStore.login({
          email: userStore.signUpRequest.email,
          password: userStore.signUpRequest.password,
        });
        if (userStore.signUpState.state.isSuccess() && tokenResponse.data) {
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
              :loading="index === slides.length - 1 ? userStore.signUpState.state.isLoading() : false"
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
