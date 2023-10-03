<template>
  <section>
    <SearchBar :getCountriesBySearch="getCountriesBySearchFromAPI" />
    <div class="flex align-items justify-between flex-wrap">
      <RegionFilter :getCountriesByRegion="getCountriesByRegionFromAPI" />
      <CarSideFilter :getCountriesByCarSide="getCountriesByCarSideFromAPI" />

      <CheckedFilter
        label="Support translation"
        :getCheckedCountries="getCountriesSupportTranslateFromAPI"
      />
      <CheckedFilter
        label="Select independent"
        :getCheckedCountries="getIndependentCountriesFromAPI"
      />
    </div>
  </section>
  <section v-if="errorList">{{ errorList }}</section>
  <section v-if="allCountries.length > 0">
    {{ pageCount }}
    <Suspense>
      <template #default>
        <CountryListItems :countries="filteredCountries" />
      </template>
      <template #fallback>
        <p>Loading countries...</p>
      </template>
    </Suspense>
    <div class="w-full flex justify-center items-center p-4">
      <!-- <button
        v-if="currentPage < nPages"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Load more
      </button> -->
    </div>
  </section>
</template>

<script>
import { defineAsyncComponent, ref, watch, computed, inject } from "vue";
import {
  getCountryByName,
  getCountriesList,
  getCountryByRegion,
} from "../api/countryApi";
import SearchBar from "../components/SearchBar.vue";
import RegionFilter from "../components/RegionFilter.vue";
import CarSideFilter from "../components/CarSideFilter.vue";
import CheckedFilter from "../components/CheckedFilter.vue";
import { languageCodes } from "../assets/data/languageCodes";

const AsyncCountryListItems = defineAsyncComponent(() =>
  import("../components/CountryListItems.vue")
);

export default {
  name: "Home",
  components: {
    CountryListItems: AsyncCountryListItems,
    SearchBar,
    RegionFilter,
    CarSideFilter,
    CheckedFilter,
  },
  setup() {
    const allCountries = ref([]);

    const translateFilter = ref(false);
    const independentFilter = ref(false);
    const regionFilter = ref(false);
    const carsideFilter = ref(false);
    const nameFilter = ref(false);

    const currentPage = ref(1);
    const itemsPerPage = ref(48);

    const errorList = ref("");
    const errorNotification = inject("errorNotification");

    const getCountriesFromAPI = async () => {
      errorList.value = "";
      try {
        allCountries.value = await getCountriesList();
      } catch (e) {
        console.log(e);
        errorList.value = e.message;
        errorNotification.emit("catch-error", errorList.value);
      }
    };

    getCountriesFromAPI();

    const getCountriesBySearchFromAPI = async (name) => {
      try {
        if (!name || name === "") {
          nameFilter.value = false;
        } else {
          const data = await getCountryByName(name);
          nameFilter.value = data;
        }
      } catch (e) {
        console.log(e);
        errorNotification.emit("catch-error", e.message);
      }
    };

    const getCountriesByRegionFromAPI = async (subregion) => {
      try {
        regionFilter.value = subregion ? subregion : false;
      } catch (e) {
        console.log(e);
        errorNotification.emit("catch-error", e.message);
      }
    };

    const getCountriesByCarSideFromAPI = async (side) => {
      try {
        carsideFilter.value = side ? side : false;
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `Failed to find countries by a side of the traffic`
        );
      }
    };

    const getCountriesSupportTranslateFromAPI = async (isTranslated) => {
      try {
        translateFilter.value = isTranslated;
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `Failed to find countries which support a translator`
        );
      }
    };

    const getIndependentCountriesFromAPI = async (isIndependent) => {
      try {
        independentFilter.value = isIndependent;
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `Failed to find independent countries`
        );
      }
    };

    const filteredCountries = computed(() => {
      let filteredCountries = allCountries.value;

      if (nameFilter.value) {
        filteredCountries = nameFilter.value;
      }

      if (regionFilter.value) {
        filteredCountries = filteredCountries.filter(
          (country) =>
            country.subregion && country.subregion === regionFilter.value
        );
      }

      if (translateFilter.value) {
        const languageNames = languageCodes.map((lang) => lang.name);
        filteredCountries = filteredCountries.filter((country) => {
          return (
            country.languages !== undefined &&
            languageNames.includes(Object.values(country.languages)[0]) &&
            Object.values(country.languages)[0] !== "English"
          );
        });
      }

      if (carsideFilter.value) {
        filteredCountries = filteredCountries.filter(
          (country) => country.car.side === carsideFilter.value
        );
      }

      if (independentFilter.value) {
        filteredCountries = filteredCountries.filter(
          (country) => country.independent === independentFilter.value
        );
      }
      return filteredCountries;
    });

    const pageCount = computed(() => {
      return Math.ceil(allCountries.value.length / itemsPerPage.value);
    });

    // const indexOfLastItem = computed(() => {
    //   return currentPage.value * itemsPerPage.value;
    // });

    // const indexOfFirstItem = computed(() => {
    //   return indexOfLastItem - itemsPerPage.value;
    // });

    // watch(
    //   () => filteredCountries,
    //   (newVal) => {
    //     filteredCountries = newVal.slice(
    //       indexOfFirstItem.value,
    //       indexOfLastItem.value
    //     );
    //   }
    // );

    return {
      allCountries,
      filteredCountries,
      currentPage,
      itemsPerPage,
      pageCount,
      errorList,

      getCountriesFromAPI,
      getCountriesBySearchFromAPI,
      getCountriesByRegionFromAPI,
      getCountriesByCarSideFromAPI,
      getCountriesSupportTranslateFromAPI,
      getIndependentCountriesFromAPI,
    };
  },
};
</script>
