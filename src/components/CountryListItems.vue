<template>
  <div class="tw-mt-4">
    <ul class="tw-w-full tw-flex tw-flex-wrap tw-align-top tw-mx-auto">
      <li
        v-for="(country, index) in countries"
        class="tw-w-full sm:tw-w-1/2 md:tw-w-1/3"
        :class="{
          'md:tw-border-r': !isLastColumn(index),
          'md:tw-border-b': !isLastRow(index),
        }"
      >
        <CountryItem :country="country" :key="country.cca2" />
      </li>
    </ul>
  </div>
</template>

<script>
import CountryItem from "../components/CountryItem.vue";

export default {
  name: "CountryListItems",
  components: { CountryItem },
  props: {
    countries: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const isLastColumn = (index) => {
      // Check if the element is in the last column
      return (index + 1) % 3 === 0;
    };
    const isLastRow = (index) => {
      // Check if the element is in the last row
      if (props.countries.length % 3 === 0) {
        return index >= props.countries.length - 3;
      }
    };

    return {
      isLastColumn,
      isLastRow,
    };
  },
};
</script>
