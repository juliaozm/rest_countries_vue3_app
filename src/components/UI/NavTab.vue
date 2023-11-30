<template>
  <nav class="tw-flex tw-border-b">
    <div v-for="route in routes" class="tw-mr-1">
      <router-link
        v-if="shouldShowRoute(route)"
        :to="route.path"
        class="tw-bg-white tw-inline-block tw-py-2 tw-px-4 tw-text-gray-500 hover:tw-text-violet-800 tw-font-semibold"
        :class="{
          'tw-border-l tw-border-t tw-border-r tw-rounded-t -tw-mb-px':
            route.path === $route.path,
        }"
        >{{ route.name.value || route.name }}</router-link
      >
    </div>
  </nav>
</template>

<script setup>
import { inject } from "vue";
import { routes } from "../../router";

const user = inject("user");

const shouldShowRoute = (route) => {
  if (route.path === "/my_countries" && !user.currentUser) {
    return false;
  }
  return (
    route.meta.shown &&
    (!route.meta.requiresAuth || (route.meta.requiresAuth && user.currentUser))
  );
};
</script>
