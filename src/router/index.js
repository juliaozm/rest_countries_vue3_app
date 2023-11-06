import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About" },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/:cca2",
    component: () => import("../views/CountryView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
