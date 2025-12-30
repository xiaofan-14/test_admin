import { createRouter, createWebHashHistory } from "vue-router";
import { basicRoutes } from "./routes";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [...basicRoutes]
})
