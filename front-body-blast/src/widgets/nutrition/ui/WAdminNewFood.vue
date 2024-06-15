<script setup lang="ts">
import { symRoundedDone } from '@quasar/extras/material-symbols-rounded';
import { useI18n } from 'vue-i18n';
import { FFoodListForm } from 'features/nutrition';
import { Food, useAdminFoodStore } from 'entities/food';
import { AppBaseEntity } from 'shared/api';
import { Notify } from 'shared/lib';
import { SBtn, SInput, SComponentWrapper } from 'shared/ui';

export interface WAdminNewFoodProps {
  userId: AppBaseEntity['id'];
}
defineProps<WAdminNewFoodProps>();
const emit = defineEmits<{
  created: [type: string];
}>();

const { t } = useI18n();

const categories = [1, 2, 3] as const;
const type = ref('');
const forms = ref<Array<InstanceType<typeof FFoodListForm>>>();
const { postFood } = useAdminFoodStore();

const clean = () => {
  type.value = '';
  forms.value?.forEach((form) => form.resetForm());
};
const onsubmit = async () => {
  if (!forms.value) return;
  if (type.value.length < 1) {
    Notify.simpleError(t('admin.nutrition.errors.no_type'));
    return;
  }

  let cat = 0;

  //TODO: refactor, bad design
  const requests = forms.value
    .map((form) => form.handleSubmit)
    .map((handle) => handle((values: { foods: Array<Food> }) => values.foods))
    .flatMap(async (call: () => Promise<Food[] | undefined>) => {
      const foods = await call?.();
      if (!foods) return Promise.reject(t('admin.nutrition.errors.no_food'));
      ++cat;
      return foods.map((food) => {
        if (food.name) return postFood({ name: food.name, category: cat, type: type.value });
        else return Promise.reject(t('admin.nutrition.errors.no_food_name'));
      });
    });

  const settled = (await Promise.allSettled(requests)) as Array<{ status: 'fulfilled' | 'rejected'; reason: string }>;
  const isAnySuccess = settled.some((settled) => settled.status === 'fulfilled');

  if (!isAnySuccess) {
    Notify.simpleError(settled[0].reason);
  }

  if (isAnySuccess) {
    emit('created', 'nutrition');

    setTimeout(() => {
      clean();
    });
  }
};
</script>

<template>
  <SComponentWrapper>
    <h1>{{ $t('admin.nutrition.new_food_title') }}</h1>

    <SInput v-model="type" watch-model-value :label="$t('admin.nutrition.type')" mb-1rem mt-0.5rem />

    <FFoodListForm
      ref="forms"
      v-for="category in categories"
      :key="category"
      :category="category"
      :type="type"
      @submit="onsubmit"
      disable-submit-btn
      clean-on-create
      mb-1.5rem
    />
    <div flex flex-row justify-end>
      <SBtn @click="onsubmit" :icon="symRoundedDone" class="translate-y-[calc(-100%-1.5rem)]" />
    </div>
  </SComponentWrapper>
</template>
