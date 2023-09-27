<template>
  <ToastError v-if="error" :message="error" />
  <div class="w-full sm:w-1/3 md:w-1/4">
    <v-select
      id="region"
      v-model="selectedRegion"
      :items="regions"
      placeholder="Select region"
      variant="outlined"
      clearable
      :clear-icon="CloseCircleIcon"
      bg-color="#fff"
      color="primary"
      item-color="primary"
      base-color="primary"
      :loading="isLoading"
      hide-no-data
      @update:modelValue="getCountriesByRegion(selectedRegion)"
    ></v-select>
  </div>
</template>

<script>
import { ref } from "vue";
import { getRegions } from "../utils/countryApi";
import { CloseCircleIcon } from "mdi-vue3";
import ToastError from "./ToastError.vue";

export default {
  name: "RegionFilter",
  components: { CloseCircleIcon, ToastError },
  props: {
    getCountriesByRegion: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const regions = ref([]);
    const selectedRegion = ref(null);
    const isLoading = ref(null);
    const error = ref("");

    const getListOfRegions = async () => {
      try {
        isLoading.value = true;
        const data = await getRegions();
        const listofregion = data
          .map((i) => i.subregion)
          .filter(
            (value, index, array) =>
              array.indexOf(value) === index && value != ""
          )
          .sort();

        setTimeout(() => {
          isLoading.value = false;
        }, 1000);

        regions.value = listofregion;
      } catch (e) {
        error.value = e.message;
      }
    };

    getListOfRegions();

    return {
      regions,
      selectedRegion,
      getListOfRegions,
      isLoading,
      error,
      CloseCircleIcon,
    };
  },
};
</script>
