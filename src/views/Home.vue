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
  <section v-else>
    <Suspense>
      <template #default>
        <CountryListItems :countries="limitedList" />
      </template>
      <template #fallback>
        <p>Loading countries...</p>
      </template>
    </Suspense>
    <div class="w-full flex justify-center items-center p-4">
      <button
        v-if="currentPage < nPages"
        @click="uploadItems"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Load more
      </button>
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
    const countries = ref([]);
    const limitedList = ref([]);
    const currentPage = ref(1);
    const nPages = ref(null);
    const itemsPerPage = ref(48);
    const errorList = ref("");
    const errorNotification = inject("errorNotification");

    const getCountriesFromAPI = async () => {
      errorList.value = "";
      try {
        const data = await getCountriesList();
        await updateCountriesData(data);
      } catch (e) {
        console.log(e);
        errorList.value = e.message;
        errorNotification.emit("catch-error", errorList.value);
      }
    };

    const getCountriesBySearchFromAPI = async (name) => {
      try {
        if (!name || name === "") {
          await getCountriesFromAPI();
        } else {
          const data = await getCountryByName(name);
          await updateCountriesData(data);
        }
      } catch (e) {
        console.log(e);
        errorNotification.emit("catch-error", e.message);
      }
    };

    const getCountriesByRegionFromAPI = async (region) => {
      try {
        if (region) {
          const data = await getCountryByRegion(region);
          await updateCountriesData(data);
        } else {
          await getCountriesFromAPI();
        }
      } catch (e) {
        console.log(e);
        errorNotification.emit("catch-error", e.message);
      }
    };

    const getCountriesByCarSideFromAPI = async (side) => {
      try {
        let data = await getCountriesList();
        if (side) {
          data = data.filter((item) => item.car.side === side);
        }
        await updateCountriesData(data);
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `Failed to find countries by a side of the traffic`
        );
      }
    };

    const getCountriesSupportTranslateFromAPI = async (isTranslated) => {
      const languageNames = languageCodes.map((lang) => lang.name);
      try {
        let data = await getCountriesList();
        if (isTranslated) {
          data = data.filter((item) => {
            return (
              item.languages !== undefined &&
              languageNames.includes(Object.values(item.languages)[0]) &&
              Object.values(item.languages)[0] !== "English"
            );
          });
        }
        await updateCountriesData(data);
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
        let data = await getCountriesList();
        if (isIndependent) {
          data = data.filter((item) => item.independent);
        }
        await updateCountriesData(data);
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `Failed to find independent countries`
        );
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
      errorList,
      countries,
      limitedList,
      currentPage,
      itemsPerPage,
      nPages,
      uploadItems,
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
