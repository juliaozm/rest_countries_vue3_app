<template>
  <div class="tw-flex tw-items-center tw-justify-between tw-px-4">
    <slot></slot>
    <button v-if="width < 768" @click="setFilterOpen">
      <AdjustmentsHorizontalIcon
        class="tw-h-11 tw-w-11 tw-text-violet-700 tw-mr-1 tw-border tw-border-violet-300 tw-p-1 tw-rounded hover:tw-bg-violet-800 hover:tw-text-gray-50 tw-transition-all active:tw-bg-violet-900"
      />
    </button>
  </div>

  <div
    v-if="isFilterOpen || width >= 768"
    class="tw-p-4 tw-flex tw-flex-wrap md:tw-flex-nowrap md:tw-w-full md:tw-justify-around tw-items-end"
  >
    <div
      class="tw-flex tw-w-full tw-flex-wrap sm:tw-flex-nowrap tw-justify-start"
    >
      <RegionFilter :getCountriesByRegion="getCountriesByRegion" />
      <CarSideFilter :getCountriesByCarSide="getCountriesByCarSide" />
    </div>

    <div class="tw-flex tw-w-full tw-justify-end">
      <CheckedFilter
        label="Support translation"
        :getCheckedCountries="getCountriesSupportTranslate"
      />
      <CheckedFilter
        label="Select independent"
        :getCheckedCountries="getIndependentCountries"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, inject } from "vue";
import RegionFilter from "../components/RegionFilter.vue";
import CarSideFilter from "../components/CarSideFilter.vue";
import CheckedFilter from "../components/CheckedFilter.vue";
import { useDisplay } from "vuetify";
import { AdjustmentsHorizontalIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits([
  "subregionFilterChange",
  "carsideFilterChange",
  "translateFilterChange",
  "independentFilterChange",
]);

const { width } = useDisplay();
const isFilterOpen = ref(true);
const errorNotification = inject("errorNotification");

const setFilterOpen = () => {
  if (width.value >= 768) {
    isFilterOpen.value = true;
  } else {
    isFilterOpen.value = !isFilterOpen.value;
  }
};

setFilterOpen();

const getCountriesByRegion = async (subregion) => {
  try {
    const subregionFilter = subregion ? subregion : false;
    emit("subregionFilterChange", subregionFilter);
  } catch (e) {
    console.log(e);
    errorNotification.emit("catch-error", e.message);
  }
};

const getCountriesByCarSide = async (side) => {
  try {
    const carsideFilter = side ? side : false;
    emit("carsideFilterChange", carsideFilter);
  } catch (e) {
    console.log(e);
    errorNotification.emit(
      "catch-error",
      `Failed to find countries by a side of the traffic`
    );
  }
};

const getCountriesSupportTranslate = async (isTranslated) => {
  try {
    const translateFilter = isTranslated;
    emit("translateFilterChange", translateFilter);
  } catch (e) {
    console.log(e);
    errorNotification.emit(
      "catch-error",
      `Failed to find countries which support a translator`
    );
  }
};

const getIndependentCountries = async (isIndependent) => {
  try {
    const independentFilter = isIndependent;
    emit("independentFilterChange", independentFilter);
  } catch (e) {
    console.log(e);
    errorNotification.emit(
      "catch-error",
      `Failed to find independent countries`
    );
  }
};
</script>