<script setup lang="ts">
import { WAdminNutritionLong } from 'widgets/WAdminNutritionLong';
import { SCenteredNav, SCenteredNavProps } from 'shared/ui/SCenteredNav';

const pageValue = ref();
const pages: SCenteredNavProps['pages'] = [
  { label: 'Питание', value: '0' },
  { label: 'Крупы', value: '1' },
  { label: 'Овощи', value: '2' },
  { label: 'Фрукты и Ягоды', value: '3' },
];
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <SCenteredNav v-model="pageValue" :pages="pages" />
      <QTabPanels>
        <QTabPanel v-for="page in pages" :key="page.value" :name="page.value">
          <WAdminNutritionLong :title="page.label" />
        </QTabPanel>
      </QTabPanels>
    </SProxyScroll>
  </SStructure>
</template>
