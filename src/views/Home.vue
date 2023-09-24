<template>
  <div id="app">
    <header></header>
    <main>
      <Suspense>
        <template #default><CountryListItems /></template>
        <template #fallback>
          <p>Loading countries...</p>
        </template>
      </Suspense>
    </main>
    <footer></footer>
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";

const AsyncCountryListItems = defineAsyncComponent(() =>
  import("../components/CountryListItems.vue")
);

export default {
  name: "Home",
  components: {
    CountryListItems: AsyncCountryListItems,
  },
};
</script>
