<script setup lang="ts">
import { QTabPanel, QTabPanels } from 'quasar';
import { WAdminNutrition } from 'widgets/WAdminNutrition';
import { useAdminNutritionStore } from 'shared/api/admin';
import { useLoadingAction } from 'shared/lib/loading';
import { SCenteredNav, SCenteredNavProps } from 'shared/ui/SCenteredNav';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

const pages: SCenteredNavProps['pages'] = [
  { label: 'Питание', value: '0' },
  { label: 'Крупы', value: '1' },
  { label: 'Овощи', value: '2' },
  { label: 'Фрукты и Ягоды', value: '3' },
];
const pageValue = ref(pages[0].value);
const { getNutritions, getNutritionsResponse } = useAdminNutritionStore();
useLoadingAction(getNutritionsResponse, () => getNutritions({}));

const nutritions = computed(() => getNutritionsResponse.data?.data);
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <div overflow-x-hidden>
        <SCenteredNav v-model="pageValue" :pages="pages" />
      </div>
      <QTabPanels :model-value="pageValue">
        <QTabPanel :name="pages[0].value" p="0!">
          <WAdminNutrition
            v-for="nutrition in nutritions"
            :nutrition="nutrition"
            :key="nutrition.id"
            :title="pages[0].label"
          />
        </QTabPanel>
        <QTabPanel v-for="page in pages" :key="page.value" :name="page.value" p="0!">
          <WAdminFood :title="page.label" />
        </QTabPanel>
      </QTabPanels>
    </SProxyScroll>
  </SStructure>
</template>
