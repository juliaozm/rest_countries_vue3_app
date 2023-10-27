<template>
  <section class="lg:tw-container lg:tw-mx-auto">
    <FilterSection
      @subregion-filter-change="(value) => (filters.region.value = value)"
      @carside-filter-change="(value) => (filters.carside.value = value)"
      @translate-filter-change="(value) => (filters.translate.value = value)"
      @independent-filter-change="
        (value) => (filters.independent.value = value)
      "
    >
      <SearchBar
        @name-filter-change="(value) => (filters.name.value = value)"
      />
    </FilterSection>
  </section>

  <section v-if="errorList">{{ errorList }}</section>
  <section>
    <Suspense>
      <template #default>
        <CountryListItems :countries="filteredChunk" />
      </template>
      <template #fallback>
        <p>Loading countries...</p>
      </template>
    </Suspense>
    <div class="tw-w-full tw-flex tw-justify-center tw-items-center tw-p-4">
      <ButtonPrimary v-if="currentPage < pageCount" :handleClick="loadMore">
        Load more
      </ButtonPrimary>
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent, ref, watch, inject } from "vue";
import { getCountriesList } from "../api/countryApi";
import usePagination from "../composable/usePagination.js";
import useCountryFilters from "../composable/useCountryFilters";
import SearchBar from "../components/SearchBar.vue";
import FilterSection from "../components/FilterSection.vue";
import ButtonPrimary from "../components/UI/ButtonPrimary.vue";
const CountryListItems = defineAsyncComponent(() =>
  import("../components/CountryListItems.vue")
);

const allCountries = ref([]);
const filteredChunk = ref([]);
const filters = {
  region: ref(false),
  carside: ref(false),
  name: ref(false),
  translate: ref(false),
  independent: ref(false),
};

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

const { filteredCountries, filteredCountriesLength } = useCountryFilters({
  allCountries,
  filters,
});

const { currentPage, pageCount, indexOfLastItem, indexOfFirstItem } =
  usePagination(filteredCountriesLength);

const chuckItems = (items) => {
  filteredChunk.value = filteredChunk.value.concat(
    items.slice(indexOfFirstItem.value, indexOfLastItem.value)
  );
};

const loadMore = () => {
  currentPage.value++;
  filteredCountries.value.length > 0
    ? chuckItems(filteredCountries.value)
    : chuckItems(allCountries.value);
};

watch(filteredCountries, (newValue) => {
  currentPage.value = 1;
  filteredChunk.value = [];
  chuckItems(newValue);
});
</script>
