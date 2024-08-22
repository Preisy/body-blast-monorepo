<script setup lang="ts">
import { groupBy } from 'lodash';
import { useI18n } from 'vue-i18n';
import { WAdminFood, WAdminNewFood, WAdminNewNutrition, WAdminNutrition } from 'widgets/nutrition';
import { useAdminFoodStore } from 'entities/food';
import { useAdminNutritionStore } from 'entities/nutrition';
import { AppBaseEntity } from 'shared/api';
import { useLoadingAction, tod } from 'shared/lib';
import { SStructure, SCenteredNav, SCenteredNavProps, SProxyScroll } from 'shared/ui';

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

const foodSlides = computed(() => groupBy(foodsData.value, ({ type }) => type));

const pages = computed<SCenteredNavProps['pages']>(() => {
  const nutritionPage = {
    label: t('admin.nutrition.nutrition'),
    value: 'nutrition',
  };
  const newFoodPage = {
    label: t('admin.nutrition.new_food'),
    value: 'new_food',
  };

  if (!foodSlides.value) return [nutritionPage, newFoodPage];
  const foodPages = Object.keys(foodSlides.value).map((type) => ({
    label: tod(`home.nutrition.${type}`),
    value: type,
  }));

  return [nutritionPage, ...foodPages, newFoodPage];
});
</script>

<template>
  <SStructure h-full flex flex-col>
    <div>
      <SCenteredNav v-model="pageValue" :pages="pages" />
    </div>

    <q-tab-panels v-model="pageValue" animated keep-alive swipeable infinite h-full>
      <q-tab-panel :name="pages[0].value" p="0!" overflow="hidden!">
        <SProxyScroll h-full>
          <WAdminNutrition
            v-for="nutrition in nutritionsData"
            :key="nutrition.id"
            :nutrition="nutrition"
            :title="pages[0].label"
          />
          <WAdminNewNutrition :user-id="id" />
        </SProxyScroll>
      </q-tab-panel>

      <q-tab-panel v-for="(foodItems, type) in foodSlides" :key="type" :name="type" p="0!" overflow-hidden>
        <SProxyScroll h-full>
          <WAdminFood :type="type.toString()" :food-items="foodItems" @deleted="pageValue = 'nutrition'" />
        </SProxyScroll>
      </q-tab-panel>

      <q-tab-panel name="new_food" p="0!">
        <SProxyScroll type="vertical" h-full overflow-x-hidden>
          <WAdminNewFood :user-id="id" @created="(type) => (pageValue = type)" />
        </SProxyScroll>
      </q-tab-panel>
    </q-tab-panels>
  </SStructure>
</template>
