<script setup lang="ts">
import { QTabProps } from 'quasar';
import { useI18n } from 'vue-i18n';
import { WPrompt } from 'widgets/WPrompt';
import { WPromptCreation } from 'widgets/WPromptCreation';
import { useAdminPromptStore } from 'shared/api/admin';
import { useLoadingAction } from 'shared/lib/loading';
import { SComponentWrapper } from 'shared/ui/SComponentWrapper';
import { SNoResultsScreen } from 'shared/ui/SNoResultsScreen';
import { SProxyScroll } from 'shared/ui/SProxyScroll';
import { SStructure } from 'shared/ui/SStructure';

const { t } = useI18n();
const routes: QTabProps[] = [
  { name: 'new', label: t('admin.prompt.nav.new') },
  { name: 'all', label: t('admin.prompt.nav.all') },
];
const currentRoute = ref(routes[0].name);
const { prompts, getPrompts } = useAdminPromptStore();
const rawPrompts = computed(() => prompts.data?.data);

useLoadingAction(prompts.state, () => getPrompts({ type: '' }));
</script>

<template>
  <SStructure h-full>
    <!-- Navigation -->
    <q-tabs
      v-model="currentRoute"
      content-class="gap-x-0.5rem justify-center"
      active-class="opacity-100!"
      absolute
      left-0
      right-0
      top-0
      z-1
    >
      <q-tab
        v-for="route in routes"
        :key="route.name"
        :name="route.name"
        :label="route.label"
        :ripple="false"
        flex="none!"
        p-0
        normal-case
        opacity-20
        transition-opacity-300
        class="[&_.q-tab\_\_indicator]:display-none [&_.q-tab\_\_label]:fw-bold!"
      />
    </q-tabs>

    <!-- Page body -->
    <q-tab-panels v-model="currentRoute" animated keep-alive swipeable h-full pt-3rem>
      <!-- Add prompt -->
      <q-tab-panel :name="routes[0].name" h-full overflow-hidden p="0!">
        <SProxyScroll h-full>
          <WPromptCreation />
        </SProxyScroll>
      </q-tab-panel>

      <!-- All prompts -->
      <q-tab-panel :name="routes[1].name" p="0!">
        <SProxyScroll h-full v-if="rawPrompts" overflow-hidden>
          <SComponentWrapper>
            <WPrompt v-for="prompt in rawPrompts" :prompt="prompt" :key="prompt.id" mb-1rem />
          </SComponentWrapper>
        </SProxyScroll>
        <SNoResultsScreen v-else />
      </q-tab-panel>
    </q-tab-panels>
  </SStructure>
</template>
