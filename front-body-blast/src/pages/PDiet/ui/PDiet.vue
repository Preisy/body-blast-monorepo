<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script setup lang="ts">
import { QTabPanel } from 'quasar';
import { useI18n } from 'vue-i18n';
import { WDietNutrition } from 'widgets/diet/WDietNutrition';
import { EDietItem } from 'entities/diet/EDietItem';
import { Food, useFoodStore } from 'shared/api/food';
import { useNutritionStore, Nutrition } from 'shared/api/nutrition';
import { useLoadingAction } from 'shared/lib/loading';
import { SCenteredNav } from 'shared/ui/SCenteredNav';
import { STabPanels } from 'shared/ui/STabPanels';

const panel = ref('nutrition');
const { t } = useI18n();
const nutritionStore = useNutritionStore();
const foodStore = useFoodStore();

// Construct fake "Nutrition" array from "Food" array
const foodList = computed(
  () =>
    foodStore.getFoodResponse.data?.data.reduce((acc: Pick<Nutrition, 'name' | 'mealItems'>[], rec) => {
      // Tries to find Nutrition with rec.type as name
      // rec.type example: 'berries', 'cereals'
      // For each rec.type construct fake Nutrition. With rec.type as name
      const index = acc.findIndex((it) => it.name === rec.type);
      // If Nutrition.name with rec.type does not exists
      if (index === -1) acc.push({ name: rec.type, mealItems: [] }); // Create one
      else acc[index].mealItems.push(rec); // Otherwise - push another food to nutrition.mealItems list
      // return array of fake Nutritions
      return acc;
    }, []),
);
// True nutritions, recieved from API
const nutrition = computed(() => nutritionStore.nutrition.data);

// API GET /food call
useLoadingAction(foodStore.getFoodResponse, foodStore.getFood);
// API GET /nutrition call
useLoadingAction(nutritionStore.nutrition, nutritionStore.getNutrition);

// Building upper navbar elements. See: SCenteredNav
const pages = computed(() => foodList.value?.map((it) => ({ value: it.name, label: t(`home.diet.${it.name}`) })) || []);
</script>

<template>
  <div class="h-full">
    <SCenteredNav v-model="panel" :pages="[{ value: 'nutrition', label: $t(`home.diet.nutrition`) }, ...pages]" pt-4 />

    <STabPanels v-model="panel" keep-alive>
      <q-tab-panel name="nutrition" overflow-hidden>
        <WDietNutrition v-if="nutrition" v-bind="nutrition" />
      </q-tab-panel>
      <q-tab-panel v-for="product in foodList" :name="product.name" :key="product.name">
        <EDietItem v-bind="product" />
      </q-tab-panel>
    </STabPanels>
  </div>
</template>