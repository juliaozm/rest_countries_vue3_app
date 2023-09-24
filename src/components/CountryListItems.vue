<template>
  <ToastError v-if="error" :message="error"></ToastError>
  <ul v-else>
    <li v-for="country in countries">
      <CountryItem :country="country" />
    </li>
  </ul>
</template>

<script>
import { ref } from "vue";
import { getCountriesList } from "../utils/api.js";
import CountryItem from "./CountryItem.vue";
import ToastError from "./ToastError.vue";

export default {
  name: "CountryListItems",
  components: { ToastError, CountryItem },
  async setup() {
    const countries = ref([]);
    const error = ref("");

    if (countries.length > 0) {
      return countries;
    } else {
      try {
        countries.value = await getCountriesList();
      } catch (e) {
        error.value = e.message;
      }
    }

    return {
      countries,
      error,
    };
  },
};
</script>
