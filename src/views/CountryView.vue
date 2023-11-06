<template>
  <Suspense>
    <template #default><CountryViewInfo :id="id" /></template>
    <template #fallback>
      <LoaderItem :text="loadingText" />
    </template>
  </Suspense>
</template>

<script setup>
import { Suspense, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
import LoaderItem from "../components/UI/LoaderItem.vue";
const CountryViewInfo = defineAsyncComponent(() =>
  import("../components/CountryViewInfo.vue")
);

const route = useRoute();
const id = computed(() => {
  return route.params.cca2;
});
const loadingText = computed(() => `Loading information about ${id.value}`);
</script>
