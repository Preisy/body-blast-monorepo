<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod';
import { EUserLoginFields } from 'entities/user';
import { Auth, useUserStore } from 'shared/api';
import { ENUMS } from 'shared/lib';
import { SBtn, SForm, SStructure } from 'shared/ui';

const router = useRouter();
const schema = toTypedSchema(Auth.validation());
const authStore = useUserStore();
const { loginState } = authStore;
const login = async (values: Auth.Dto) => {
  await authStore.login(values);
  if (loginState.state.isError()) return;
  router.replace({ name: ENUMS.ROUTES_NAMES.TRAINING });
};
</script>

<template>
  <SStructure relative mt--6.5rem class="h-[calc(100vh-4rem)]" flex items-center justify-center>
    <SForm :field-schema="schema" @submit="login" w-full>
      <EUserLoginFields />
      <template #submit-btn>
        <div mt-0.5rem flex justify-between>
          <SBtn :loading="authStore.loginState.state.isLoading()" icon="done" type="submit" ml-auto />
        </div>
      </template>
    </SForm>
  </SStructure>
</template>
