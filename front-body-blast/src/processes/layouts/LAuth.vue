<script setup lang="ts">
import { TouchSwipeValue } from 'quasar';
import { ENUMS } from 'shared/lib/enums';
import { SNavList, RouteRecord } from 'shared/ui/nav-list';

type SwipeEventData = Parameters<Exclude<TouchSwipeValue, undefined>>['0'];

const router = useRouter();
const routes: Array<RouteRecord> = [
  {
    name: ENUMS.ROUTES_NAMES.LOGIN,
    label: 'Вход',
  },
  {
    name: ENUMS.ROUTES_NAMES.REGISTER,
    label: 'Регистрация',
  },
];

const e = ({ direction }: SwipeEventData) => {
  if (!direction) return;
  const map = {
    right: () => router.push(routes.at(0)!.name),
    left: () => router.push(routes.at(1)!.name),
  } as const;
  map[direction as keyof typeof map]();
};
</script>

<template>
  <q-layout view="hHh lpr fFf" v-touch-swipe.horizontal.capture="e">
    <q-page-container>
      <SNavList :routes="routes" relative z-1 pb-30px pt-20px />

      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition as string" mode="out-in">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>
