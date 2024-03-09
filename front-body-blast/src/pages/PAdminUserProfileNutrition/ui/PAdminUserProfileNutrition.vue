<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { WAdminFood } from 'widgets/WAdminFood';
import { WAdminNewFood } from 'widgets/WAdminNewFood';
import { WAdminNewNutrition } from 'widgets/WAdminNewNutrition';
import { WAdminNutrition } from 'widgets/WAdminNutrition';
import { useAdminFoodStore, useAdminNutritionStore } from 'shared/api/admin';
import { Food } from 'shared/api/food';
import { useLoadingAction } from 'shared/lib/loading';
import { tod } from 'shared/lib/utils';
import { SCenteredNav, SCenteredNavProps } from 'shared/ui/SCenteredNav';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserProfileNutritionProps {
  id: number;
}
defineProps<PAdminUserProfileNutritionProps>();

const { t } = useI18n();

const pageValue = ref('nutrition');
const { getNutritions, nutritionList } = useAdminNutritionStore();
useLoadingAction(nutritionList.state, () => getNutritions({ expanded: true }));
const { getFoods, foodList } = useAdminFoodStore();
useLoadingAction(foodList.state, getFoods);

const nutritionsData = computed(() => nutritionList.data?.data);
const foodsData = computed(() => foodList.data?.data);

type AccumulatorType = Record<string, Array<Food>>;
const foodSlides = computed(
  () =>
    foodsData.value?.reduce<AccumulatorType>((acc: AccumulatorType, food) => {
      const isTypeInAcc = food.type in acc;
      if (!isTypeInAcc) acc[food.type] = [];
      acc[food.type].push(food);
      return acc;
    }, {}),
);

const pages = computed<SCenteredNavProps['pages']>(() => {
  const nutritionPage = { label: t('admin.nutrition.nutrition'), value: 'nutrition' };
  const newFoodPage = { label: t('admin.nutrition.new_food'), value: 'new_food' };

  if (!foodSlides.value) return [nutritionPage, newFoodPage];
  const foodPages = Object.keys(foodSlides.value).map((type) => ({
    label: tod(`home.diet.${type}`),
    value: type,
  }));

  return [nutritionPage, ...foodPages, newFoodPage];
});
</script>

<template>
  <SStructure h-full>
    <SProxyScroll w-full>
      <div overflow-x-hidden>
        <SCenteredNav v-model="pageValue" :pages="pages" />
      </div>

      <q-tab-panels v-if="foodSlides && nutritionsData" v-model="pageValue" animated keep-alive swipeable infinite>
        <q-tab-panel :name="pages[0].value" p="0!">
          <WAdminNutrition
            v-for="nutrition in nutritionsData"
            :nutrition="nutrition"
            :key="nutrition.id"
            :title="pages[0].label"
          />
          <WAdminNewNutrition :user-id="id" />
        </q-tab-panel>

        <q-tab-panel v-for="[type, foodItems] in Object.entries(foodSlides)" :key="type" :name="type" p="0!">
          <WAdminFood :type="type" :food-items="foodItems" />
        </q-tab-panel>

        <q-tab-panel name="new_food" p="0!">
          <WAdminNewFood :user-id="id" />
        </q-tab-panel>
      </q-tab-panels>
      <SNoResultsScreen v-else />
    </SProxyScroll>
  </SStructure>
</template>
