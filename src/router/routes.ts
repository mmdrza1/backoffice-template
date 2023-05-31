import { createRouter, createWebHistory } from "vue-router";
import defaultLayout from "@/layouts/default.vue";

const routes = [
  {
    path: "/defaultLayout",
    component: defaultLayout,
    children: [
      { path: "/", component: () => import("@/pages/dashboard/index.vue") },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
