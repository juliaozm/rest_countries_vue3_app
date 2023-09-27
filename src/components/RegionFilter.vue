<template>
  <ToastError v-if="error" :message="error" />
  <div class="w-full sm:w-1/3 md:w-1/4">
    <FilterSelectItem
      v-model="selectedRegion"
      :items="regions"
      placeholder="Select a region"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import { getRegions } from "../utils/countryApi";
import ToastError from "./ToastError.vue";
import FilterSelectItem from "./FilterSelectItem.vue";

export default {
  name: "RegionFilter",
  components: { FilterSelectItem, ToastError },
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

    const getListOfRegions = async () => {
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
        error.value = e.message;
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
