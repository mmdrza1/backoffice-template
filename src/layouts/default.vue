<template>
  <q-layout class="default-layout">
    <q-header elevated class="text-white">
      <q-toolbar :class="isDarkMode ? 'bg-dark' : 'bg-primary'">
        <div class="fit row justify-between">
          <q-btn class="" icon="menu" dense flat round @click="DrawerOpen = !DrawerOpen" />
          <q-select v-model="lang" :options="localeOptions" :label="$t('language')" dense outlined options-dense
            @update:model-value="changeLanguage" style="width: 200px" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="DrawerOpen" bordered show-if-above class="q-pb-lg">
      <div class="row items-center justify-around q-py-md">
        <div class="text-h4 text-primary">{{ $t(title) }}</div>
        <q-toggle class="col-3" color="primary" :icon="isDarkMode ? 'dark_mode' : 'light_mode'" size="xl" dense
          v-model="$q.dark.isActive" />
      </div>
      <q-separator inset />
      <div v-for="(item, index) in sideBar" :key="index">
        <div class="row items-center q-py-sm cursor-pointer menu-item" :class="[
          route.path === item.path ? 'bg-primary' : '',
          index === 0 ? 'q-my-sm' : ' q-my-xs',
        ]" @click="router.push(item.path)">
          <q-icon class="q-px-md" :name="item.icon" size="md" />
          <div class="text-h7">
            {{ $t(item.label) }}
          </div>
        </div>
        <q-separator v-if="item.borderbottom" inset />
        <div v-if="item.nextSectionTitle" class="text-caption q-pt-sm text-accent q-pr-md">
          {{ $t(item.nextSectionTitle) }}
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
//// initial data
import { useQuasar } from "quasar";
import { ref, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { Isidebar } from "@/model/interface/sidebar";
import { useLocale } from '@/composable/use-locale'

//// Life Cycles
onMounted(() => {
  if (localStorage.getItem("darkMode") === "true") {
    $q.dark.set(true);
    isDarkMode.value = true;
  }
});

//// data
// initial values
const $q = useQuasar();
const route = useRoute();
const router = useRouter();
const locale = useLocale();

function changeLanguage({ value }) {
  locale.setLocale(value);
}
const lang = ref(localStorage.getItem('language') === 'enGB' ? 'English' : 'فارسی');

// variables
const title = ref<string>("lorem");
const isDarkMode = ref<boolean>(false);
const DrawerOpen = ref<boolean>(false);
const localeOptions = [
  {
    value: 'enGB',
    label: 'English',
  },
  {
    value: 'faIR',
    label: 'فارسی',
  },
];
const sideBar = ref<Isidebar[]>([
  {
    path: "/",
    label: "lorem",
    icon: "dashboard",
    borderbottom: true,
    nextSectionTitle: "lorem",
  },
]);

//// watchers
watch(
  () => $q.dark.isActive,
  (val) => {
    $q.dark.set(val);
    isDarkMode.value = val;
    localStorage.setItem("darkMode", val.toString());
  }
);
</script>

<style lang="scss">
.default-layout {
  .menu-item {
    width: 95%;
  }

  .right-border-radius {
    border-radius: 32px 0 0 32px;
  }

  .left-border-radius {
    border-radius: 0 32px 32px 0;
  }

  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
