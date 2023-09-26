<template>
  <SearchBar
    :getSearch="getCountriesBySearchFromAPI"
    :getCountries="getCountriesFromAPI"
  />
  <Suspense>
    <template #default>
      <CountryListItems :countries="limitedList" :error="error" />
    </template>
    <template #fallback>
      <p>Loading countries...</p>
    </template>
  </Suspense>
  <button v-if="currentPage < nPages" @click="uploadItems">Load more</button>
</template>

<script>
import { defineAsyncComponent, ref, watch, computed } from "vue";
import { getCountryByName, getCountriesList } from "../utils/countryApi";
import SearchBar from "../components/SearchBar.vue";

const AsyncCountryListItems = defineAsyncComponent(() =>
  import("../components/CountryListItems.vue")
);

export default {
  name: "Home",
  components: {
    CountryListItems: AsyncCountryListItems,
    SearchBar,
  },
  setup() {
    const countries = ref([]);
    const error = ref("");
    const limitedList = ref([]);
    const currentPage = ref(1);
    const nPages = ref(null);
    const itemsPerPage = ref(48);

    const getCountriesFromAPI = async () => {
      error.value = "";
      try {
        const data = await getCountriesList();
        await updateCountriesData(data);
      } catch (e) {
        error.value = e.message;
      }
    };

    const getCountriesBySearchFromAPI = async (name) => {
      error.value = "";
      try {
        const data = await getCountryByName(name);
        await updateCountriesData(data);
      } catch (e) {
        error.value = e.message;
      }
    };

    const updateCountriesData = async (data) => {
      countries.value = data;
      nPages.value = Math.ceil(data.length / itemsPerPage.value);
    };

    const indexOfLastItem = computed(() => {
      return currentPage.value * itemsPerPage.value;
    });

    const indexOfFirstItem = computed(() => {
      return indexOfLastItem - itemsPerPage.value;
    });

    const uploadItems = () => {
      currentPage.value++;
      getCountriesFromAPI();
    };

    watch(
      () => countries.value,
      (newVal) => {
        limitedList.value = newVal.slice(
          indexOfFirstItem.value,
          indexOfLastItem.value
        );
      }
    );

    getCountriesFromAPI();

    return {
      error,
      countries,
      limitedList,
      currentPage,
      itemsPerPage,
      nPages,
      uploadItems,
      getCountriesFromAPI,
      getCountriesBySearchFromAPI,
    };
  },
};
</script>
