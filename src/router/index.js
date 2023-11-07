import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", name: "Home", component: () => import("../views/Home.vue") },
  {
    path: "/my_countries",
    name: "My Countries",
    component: () => import("../views/MyCountries.vue"),
  },
  {
    path: "/authentication",
    name: "Login",
    component: () => import("../views/AuthView.vue"),
  },
  {
    path: "/:cca2",
    component: () => import("../views/CountryView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

export default router;
