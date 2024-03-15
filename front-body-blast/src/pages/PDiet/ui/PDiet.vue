<script setup lang="ts">
import { QTabPanel } from 'quasar';
import { WDietNutrition } from 'widgets/diet/WDietNutrition';
import { EDietItem } from 'entities/diet/EDietItem';
import { useFoodStore } from 'shared/api/food';
import { useNutritionStore, Nutrition } from 'shared/api/nutrition';
import { useLoadingAction } from 'shared/lib/loading';
import { tod } from 'shared/lib/utils';
import { SCenteredNav } from 'shared/ui/SCenteredNav';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { STabPanels } from 'shared/ui/STabPanels';

const panel = ref('nutrition');
const { getNutrition, nutritionList } = useNutritionStore();
const foodStore = useFoodStore();

// Construct fake "Nutrition" array from "Food" array
const foodList = computed(
  () =>
    foodStore.food.data?.data.reduce((acc: Pick<Nutrition, 'name' | 'mealItems'>[], rec) => {
      // Tries to find Nutrition with rec.type as name
      // rec.type example: 'berries', 'cereals'
      // For each rec.type construct fake Nutrition. With rec.type as name
      const index = acc.findIndex((it) => it.name === rec.type);
      // If Nutrition.name with rec.type does not exists
      if (index === -1) acc.push({ name: rec.type, mealItems: [rec] }); // Create one
      else acc[index].mealItems?.push(rec); // Otherwise - push another food to nutrition.mealItems list
      // return array of fake Nutritions
      return acc;
    }, []),
);
// True nutritions, recieved from API
const nutritions = computed(() => nutritionList.data?.data);

useLoadingAction(nutritionList, () => Promise.all([foodStore.getFood(), getNutrition({ expanded: true })]));

// Building upper navbar elements. See: SCenteredNav
const pages = computed(
  () => foodList.value?.map((it) => ({ value: it.name, label: tod(`home.diet.${it.name}`) })) || [],
);
</script>

<template>
  <div h-full flex flex-col>
    <SCenteredNav v-model="panel" :pages="[{ value: 'nutrition', label: $t(`home.diet.nutrition`) }, ...pages]" pt-4 />

    <STabPanels v-model="panel" keep-alive>
      <q-tab-panel name="nutrition" overflow-hidden>
        <WDietNutrition v-if="nutritions" :nutritions="nutritions" />
      </q-tab-panel>
      <q-tab-panel v-for="product in foodList" :name="product.name" :key="product.name">
        <SProxyScroll>
          <EDietItem v-if="product.mealItems" :name="product.name" :meal-items="product.mealItems" />
        </SProxyScroll>
      </q-tab-panel>
    </STabPanels>
  </div>
</template>
