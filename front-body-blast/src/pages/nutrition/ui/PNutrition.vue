<script setup lang="ts">
import { groupBy } from 'lodash';
import { QTabPanel } from 'quasar';
import { useFoodStore, EFoodItem } from 'entities/food';
import { ENutritionList, useNutritionStore } from 'entities/nutrition';
import { useLoadingAction, tod } from 'shared/lib';
import { SCenteredNav, STabPanels, SProxyScroll } from 'shared/ui';

const panel = ref('nutrition');
const { getNutrition, nutritionList } = useNutritionStore();
const foodStore = useFoodStore();

// Fake nutritions, build from foods
const foodList = computed(() => groupBy(foodStore.food.data?.data, ({ type }) => type));

// True nutritions, recieved from API
const nutritions = computed(() => nutritionList.data?.data);

useLoadingAction(nutritionList, () => Promise.all([foodStore.getFood(), getNutrition({ expanded: true })]));

// Building upper navbar elements. See: SCenteredNav
const pages = computed(
  // () => foodList.value?.map((it) => ({ value: it.name, label: tod(`home.nutrition.${it.name}`) })) || [],
  () => Object.keys(foodList.value).map((name) => ({ value: name, label: tod(`home.nutrition.${name}`) })),
);
</script>

<template>
  <div h-full flex flex-col>
    <SCenteredNav
      v-model="panel"
      :pages="[{ value: 'nutrition', label: $t(`home.nutrition.nutrition`) }, ...pages]"
      pt-4
    />

    <STabPanels v-model="panel" keep-alive>
      <q-tab-panel name="nutrition" overflow-hidden>
        <ENutritionList v-if="nutritions" :nutritions="nutritions" />
      </q-tab-panel>
      <q-tab-panel v-for="(food, type) in foodList" :name="type" :key="type">
        <SProxyScroll>
          <!-- <ENutritionItem v-if="!!food.length" :name="type.toString()" :meal-items="food" /> -->
          <EFoodItem v-if="!!food.length" :type="type.toString()" :items="food" />
        </SProxyScroll>
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
