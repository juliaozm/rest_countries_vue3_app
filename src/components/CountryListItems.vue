<template>
  <ToastError v-if="error" :message="error"></ToastError>
  <div v-else>
    <ul class="w-full flex flex-wrap justify-between align-top mx-auto">
      <li v-for="country in countries" class="w-full sm:w-1/2 lg:w-1/3">
        <CountryItem :country="country" />
      </li>
    </ul>
    <button v-if="currentPage < nPages" @click="uploadItems">Show more</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { getCountriesList } from "../utils/countryApi.js";
import CountryItem from "./CountryItem.vue";
import ToastError from "./ToastError.vue";

export default {
  name: "CountryListItems",
  components: { ToastError, CountryItem },
  async setup() {
    const countries = ref([]);
    const error = ref("");
    const currentPage = ref(0);
    const itemsPerPage = ref(48);
    const indexOfLastItem = ref(null);
    const indexOfFirstItem = ref(null);
    const nPages = ref(1);

    const uploadItems = () => {
      currentPage.value++;
      indexOfLastItem.value = currentPage.value * itemsPerPage.value;
      indexOfFirstItem.value = indexOfLastItem.value - itemsPerPage.value;
      getFromAPI();
    };

    const getFromAPI = async () => {
      try {
        const data = await getCountriesList();
        nPages.value = Math.ceil(data.length / itemsPerPage.value);
        countries.value = countries.value.concat(
          data.slice(indexOfFirstItem.value, indexOfLastItem.value)
        );
      } catch (e) {
        error.value = e.message;
      }
    };

    uploadItems();

    return {
      countries,
      error,
      uploadItems,
      nPages,
      currentPage,
    };
  },
};
</script>
