<template>
  <div id="app">
    <header class="tw-w-full tw-p-4">
      <nav class="tw-flex tw-border-b">
        <div v-for="route in navRoutes" class="tw-mr-1">
          <router-link
            :to="route.path"
            class="tw-bg-white tw-inline-block tw-py-2 tw-px-4 tw-text-gray-500 hover:tw-text-violet-800 tw-font-semibold"
            :class="{
              'tw-border-l tw-border-t tw-border-r tw-rounded-t -tw-mb-px':
                route.path === $route.path,
            }"
            >{{ route.name }}</router-link
          >
        </div>
      </nav>
    </header>
    <main>
      <router-view> </router-view>
      <ToastError />
    </main>
    <footer></footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import ToastError from "./components/ToastError.vue";

const navRoutes = ref([
  { path: "/", name: "Home" },
  { path: "/about", name: "About" },
  { path: "/login", name: "Login" },
]);
</script>
