<template>
  <Suspense>
    <template #default><CountryViewInfo :id="props.cca2" /></template>
    <template #fallback>
      <LoaderItem :text="loadingText" />
    </template>
  </Suspense>
</template>

<script setup>
import { Suspense, computed, defineAsyncComponent } from "vue";
import LoaderItem from "../components/UI/LoaderItem.vue";
const CountryViewInfo = defineAsyncComponent(() =>
  import("../components/CountryViewInfo.vue")
);
const props = defineProps({
  cca2: String,
});

const loadingText = computed(() => `Loading information about ${props.cca2}`);
</script>
