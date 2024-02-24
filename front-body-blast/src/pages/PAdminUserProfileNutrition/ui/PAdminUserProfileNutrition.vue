<script setup lang="ts">
import { QTabPanel, QTabPanels } from 'quasar';
import { useI18n } from 'vue-i18n';
import { WAdminFood } from 'widgets/WAdminFood';
import { WAdminNewFood } from 'widgets/WAdminNewFood';
import { WAdminNewNutrition } from 'widgets/WAdminNewNutrition';
import { WAdminNutrition } from 'widgets/WAdminNutrition';
import { useAdminFoodStore, useAdminNutritionStore } from 'shared/api/admin';
import { Food } from 'shared/api/food';
import { useLoadingAction } from 'shared/lib/loading';
import { SCenteredNav, SCenteredNavProps } from 'shared/ui/SCenteredNav';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserProfileNutritionProps {
  id: number;
}
defineProps<PAdminUserProfileNutritionProps>();

const { t, te } = useI18n();

const pageValue = ref('nutrition');
const { getNutritions, nutritions } = useAdminNutritionStore();
useLoadingAction(nutritions.state, () => getNutritions({ expanded: true }));
const { getFoods, foods } = useAdminFoodStore();
useLoadingAction(foods.state, getFoods);

const nutritionsData = computed(() => nutritions.data?.data);
const foodsData = computed(() => foods.data?.data);

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
  const result: SCenteredNavProps['pages'] = [];
  const nutritionPage = { label: t('admin.nutrition.nutrition'), value: 'nutrition' };
  result.push(nutritionPage);

  if (!foodSlides.value) return result;
  const foodPages = Object.keys(foodSlides.value).map((type) => ({
    label: te(`home.diet.${type}`) ? t(`home.diet.${type}`) : type,
    value: type,
  }));
  result.push(...foodPages);

  result.push({ label: t('admin.nutrition.new_food'), value: 'new_food' });

  return result;
});
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <div overflow-x-hidden>
        <SCenteredNav v-model="pageValue" :pages="pages" />
      </div>

      <QTabPanels v-if="foodSlides && nutritionsData" :model-value="pageValue" swipeable infinite z-10>
        <QTabPanel :name="pages[0].value" p="0!">
          <WAdminNutrition
            v-for="nutrition in nutritionsData"
            :nutrition="nutrition"
            :key="nutrition.id"
            :title="pages[0].label"
          />
          <WAdminNewNutrition :user-id="id" />
        </QTabPanel>

        <QTabPanel v-for="[type, foodItems] in Object.entries(foodSlides)" :key="type" :name="type" p="0!">
          <WAdminFood :type="type" :food-items="foodItems" />
        </QTabPanel>

        <QTabPanel name="new_food" p="0!">
          <WAdminNewFood :user-id="id" />
        </QTabPanel>
      </QTabPanels>

      <SNoResultsScreen v-else />
    </SProxyScroll>
  </SStructure>
</template>
