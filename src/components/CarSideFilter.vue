<template>
  <div class="w-full sm:w-1/3 md:w-1/4">
    <FilterSelectItem
      v-model="selectedCarSide"
      :items="sides"
      placeholder="Select a driving side"
      item-title="name"
      item-value="side"
    />
  </div>
</template>

<script>
import { ref, watch } from "vue";
import FilterSelectItem from "./FilterSelectItem.vue";

export default {
  name: "CarSideFilter",
  components: { FilterSelectItem },
  props: {
    getCountriesByCarSide: {
      type: Function,
      required: true,
    },
  },
  setup({ getCountriesByCarSide }) {
    const sides = ref([
      { name: "Left-hand traffic", side: "left" },
      { name: "Right-hand traffic", side: "right" },
    ]);
    const selectedCarSide = ref(null);

    watch(selectedCarSide, (newValue) => {
      console.log("selectedCarSide changed:", newValue);
      getCountriesByCarSide(newValue);
    });

    return {
      sides,
      selectedCarSide,
    };
  },
};
</script>
