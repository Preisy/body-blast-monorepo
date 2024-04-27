<script setup lang="ts">
import { StyleValue } from 'vue';
import { useI18n } from 'vue-i18n';
import { WAdminFood, WAdminNewFood, WAdminNewNutrition, WAdminNutrition } from 'widgets/admin/nutrition';
import { useAdminFoodStore, useAdminNutritionStore } from 'shared/api/admin';
import { AppBaseEntity } from 'shared/api/base';
import { Food } from 'shared/api/food';
import { Nutrition } from 'shared/api/nutrition';
import { useLoadingAction } from 'shared/lib/loading';
import { tod } from 'shared/lib/utils';
import { SCenteredNav, SCenteredNavProps } from 'shared/ui/SCenteredNav';
import { SLoading } from 'shared/ui/SLoading';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

export interface PAdminUserProfileNutritionProps {
  id: AppBaseEntity['id'];
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

const calcHeight = (nutr: Nutrition): StyleValue => ({
  minHeight: nutr.mealItems ? `${nutr.mealItems.length * 115 + 400}px` : '500px',
});
</script>

<template>
  <SStructure h-full flex flex-col>
    <div>
      <SCenteredNav v-model="pageValue" :pages="pages" />
    </div>

    <q-tab-panels v-if="foodSlides && nutritionsData" v-model="pageValue" animated keep-alive swipeable infinite h-full>
      <q-tab-panel :name="pages[0].value" p="0!" overflow="hidden!">
        <SProxyScroll h-full>
          <q-intersection v-for="nutrition in nutritionsData" :key="nutrition.id" :style="calcHeight(nutrition)">
            <WAdminNutrition :nutrition="nutrition" :title="pages[0].label" />
          </q-intersection>
          <WAdminNewNutrition :user-id="id" />
        </SProxyScroll>
      </q-tab-panel>

      <q-tab-panel
        v-for="[type, foodItems] in Object.entries(foodSlides)"
        :key="type"
        :name="type"
        p="0!"
        overflow-hidden
      >
        <SProxyScroll h-full>
          <WAdminFood :type="type" :food-items="foodItems" />
        </SProxyScroll>
      </q-tab-panel>

      <q-tab-panel name="new_food" p="0!">
        <SProxyScroll type="vertical" h-full overflow-x-hidden>
          <WAdminNewFood :user-id="id" @created="(type) => (pageValue = type)" />
        </SProxyScroll>
      </q-tab-panel>
    </q-tab-panels>
    <SLoading v-else />
  </SStructure>
</template>
