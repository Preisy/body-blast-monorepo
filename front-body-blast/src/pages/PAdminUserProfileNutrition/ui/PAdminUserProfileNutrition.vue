<script setup lang="ts">
import { QTabPanel, QTabPanels } from 'quasar';
import { useI18n } from 'vue-i18n';
import { WAdminFood } from 'widgets/WAdminFood';
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

const { t } = useI18n();

const pageValue = ref('0');
const { getNutritions, getNutritionsResponse } = useAdminNutritionStore();
useLoadingAction(getNutritionsResponse, () => getNutritions({ expanded: true }));
const { getFoods, getFoodsResponse } = useAdminFoodStore();
useLoadingAction(getFoodsResponse, getFoods);

const nutritions = computed(() => getNutritionsResponse.data?.data);
const foods = computed(() => getFoodsResponse.data?.data);

type AccumulatorType = Record<string, Array<Food>>;
const foodSlides = computed(
  () =>
    foods.value?.reduce<AccumulatorType>((acc: AccumulatorType, food) => {
      const isTypeInAcc = food.type in acc;
      if (!isTypeInAcc) acc[food.type] = [];
      acc[food.type].push(food);
      return acc;
    }, {}),
);

const pages = computed<SCenteredNavProps['pages']>(() => {
  const result = [];
  const nutritionPage = { label: t('admin.nutrition.nutrition'), value: '0' };
  result.push(nutritionPage);

  if (!foodSlides.value) return result;
  const foodPages = Object.keys(foodSlides.value).map((type, index) => ({
    label: t(`home.diet.${type}`),
    value: (index + 1).toString(),
  }));
  result.push(...foodPages);

  return result;
});
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <div overflow-x-hidden>
        <SCenteredNav v-model="pageValue" :pages="pages" />
      </div>

      <QTabPanels v-if="foodSlides && nutritions" :model-value="pageValue" swipeable infinite z-10>
        <QTabPanel :name="pages[0].value" p="0!">
          <WAdminNutrition
            v-for="nutrition in nutritions"
            :nutrition="nutrition"
            :key="nutrition.id"
            :title="pages[0].label"
          />
          <WAdminNewNutrition :user-id="id" />
        </QTabPanel>

        <QTabPanel
          v-for="([type, foodItems], index) in Object.entries(foodSlides)"
          :key="type"
          :name="(index + 1).toString()"
          p="0!"
        >
          <WAdminFood :type="type" :food-items="foodItems" />
        </QTabPanel>
      </QTabPanels>

      <SNoResultsScreen v-else />
    </SProxyScroll>
  </SStructure>
</template>
