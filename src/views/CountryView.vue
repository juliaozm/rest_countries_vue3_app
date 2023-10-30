<template>
  <Suspense>
    <template #default><CountryViewInfo :id="id" /></template>
    <template #fallback>
      <p>Loading information about {{ id }}</p>
    </template>
  </Suspense>
</template>

<script setup>
import { Suspense, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
const CountryViewInfo = defineAsyncComponent(() =>
  import("../components/CountryViewInfo.vue")
);

const route = useRoute();
const id = computed(() => {
  return route.params.cca2;
});
</script>
