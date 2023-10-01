<template>
  <div id="app">
    <header class="w-full p-4">
      <nav class="flex border-b">
        <div v-for="route in navRoutes" class="mr-1">
          <router-link
            :to="route.path"
            class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold"
            :class="{
              'border-l border-t border-r rounded-t text-blue-700 -mb-px':
                route.path === $route.path,
            }"
            >{{ route.name }}</router-link
          >
        </div>
      </nav>
    </header>
    <main>
      <ToastError />
      <div class="container mx-auto">
        <router-view> </router-view>
      </div>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { ref } from "vue";
import ToastError from "./components/ToastError.vue";

export default {
  components: {
    ToastError,
  },
  setup() {
    const navRoutes = ref([
      { path: "/", name: "Home" },
      { path: "/about", name: "About" },
      { path: "/login", name: "Login" },
    ]);

    return { navRoutes };
  },
};
</script>
