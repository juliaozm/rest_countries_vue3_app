<template>
  <Suspense>
    <template #default><ExpandedCountryItem :id="id" /></template>
    <template #fallback>
      <p>Loading information about {{ id }}</p>
    </template>
  </Suspense>
</template>

<script>
import { Suspense, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";
const AsyncExpandedCountryItem = defineAsyncComponent(() =>
  import("../components/ExpandedCountryItem.vue")
);
export default {
  name: "ExpandedCountryWrapper",
  components: { ExpandedCountryItem: AsyncExpandedCountryItem },
  setup() {
    const route = useRoute();
    const id = computed(() => {
      return route.params.cca2;
    });
    return { id };
  },
};
</script>
