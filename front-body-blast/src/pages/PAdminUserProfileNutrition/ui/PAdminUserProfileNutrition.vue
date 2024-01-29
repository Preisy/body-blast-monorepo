<script setup lang="ts">
import { QTabPanel, QTabPanels } from 'quasar';
import { WAdminNutritionLong } from 'widgets/WAdminNutritionLong';
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
</script>

<template>
  <SStructure h-full>
    <SProxyScroll h-full>
      <div overflow-x-hidden>
        <SCenteredNav v-model="pageValue" :pages="pages" />
      </div>
      <QTabPanels :model-value="pageValue">
        <QTabPanel v-for="page in pages" :key="page.value" :name="page.value" p="0!">
          <WAdminNutritionLong :title="page.label" />
        </QTabPanel>
      </QTabPanels>
    </SProxyScroll>
  </SStructure>
</template>
