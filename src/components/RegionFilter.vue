<template>
  <div class="tw-w-full md:tw-w-1/2 lg:tw-w-56 sm:tw-mr-4">
    <FilterSelectItem
      v-model="selectedRegion"
      :items="regions"
      placeholder="Select a region"
    />
  </div>
</template>

<script>
import { ref, watch, inject } from "vue";
import { getRegions } from "../api/countryApi";
import FilterSelectItem from "./FilterSelectItem.vue";

export default {
  name: "RegionFilter",
  components: { FilterSelectItem },
  props: {
    getCountriesByRegion: {
      type: Function,
      required: true,
    },
  },
  setup({ getCountriesByRegion }) {
    const regions = ref([]);
    const selectedRegion = ref(null);
    const error = ref("");
    const errorNotification = inject("errorNotification");

    const getListOfRegions = async () => {
      error.value = "";
      try {
        const data = await getRegions();
        const listofregion = data
          .map((i) => i.subregion)
          .filter(
            (value, index, array) =>
              array.indexOf(value) === index && value != ""
          )
          .sort();
        regions.value = listofregion;
      } catch (e) {
        console.log(e);
        error.value = e.message;
        errorNotification.emit("catch-error", error.value);
      }
    };

    getListOfRegions();

    watch(selectedRegion, (newValue) => {
      console.log("selectedRegion changed:", newValue);
      getCountriesByRegion(newValue);
    });

    return {
      regions,
      selectedRegion,
      getListOfRegions,
      error,
    };
  },
};
</script>
