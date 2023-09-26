<template>
  <ToastError v-if="error" :message="error"></ToastError>
  <div class="mt-4">
    <ul class="w-full flex flex-wrap justify-between align-top mx-auto">
      <li v-for="country in countries" class="w-full sm:w-1/2 lg:w-1/3">
        <CountryItem :country="country" :key="country.cca2" />
      </li>
    </ul>
  </div>
</template>

<script>
import CountryItem from "../components/CountryItem.vue";
import ToastError from "../components/ToastError.vue";

export default {
  name: "CountryListItems",
  components: { ToastError, CountryItem },
  props: {
    countries: {
      type: Array,
      required: true,
    },
    error: {
      type: String,
    },
  },
  setup({ countries }) {},
};
</script>
