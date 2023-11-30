import { createRouter, createWebHistory } from "vue-router";
import { getAuth } from "firebase/auth";
import { appAuth } from "../../firebase.config";
import { ref } from "vue";
const Home = () => import("../views/Home.vue");
const Auth = () => import("../views/AuthView.vue");
const Country = () => import("../views/CountryView.vue");
const MyCountries = () => import("../views/MyCountriesView.vue");

const user = getAuth(appAuth);
const authNameRoute = ref("Login");

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: false,
      shown: true,
    },
  },
  {
    path: "/my_countries",
    name: "My Countries",
    component: MyCountries,
    meta: {
      requiresAuth: false,
      shown: true,
    },
  },
  {
    path: "/authentication",
    name: authNameRoute,
    component: Auth,
    meta: {
      requiresAuth: false,
      shown: true,
    },
  },
  {
    path: "/:cca2",
    name: "Country",
    component: Country,
    props: true,
    meta: {
      requiresAuth: false,
      shown: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: "active",
});

router.beforeEach(async (to) => {
  if (!user.currentUser) {
    // The `/my_countries` route is protected and will redirect to `/authentication` if not authenticated
    if (to.path === "/my_countries") {
      return "/authentication";
    }
  }
  return true;
});

router.afterEach(async (to) => {
  authNameRoute.value = !user.currentUser ? "Login" : "Log out";
  return true;
});

export { router, routes };
