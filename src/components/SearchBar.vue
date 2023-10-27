<template>
  <form
    class="tw-flex tw-w-full md:tw-justify-center"
    @submit.prevent="getCountriesBySearchFromAPI(search)"
  >
    <v-responsive>
      <v-text-field
        id="searchbar"
        type="input"
        v-model.trim="search"
        density="compact"
        variant="outlined"
        label="Country name"
        placeholder="Search for country..."
        clearable
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        color="primary"
        item-color="primary"
        base-color="primary"
        @input="handleInput"
        @click:prepend-inner="getCountriesBySearchFromAPI(search)"
        @click:clear="getCountriesBySearchFromAPI(search)"
        class="tw-mr-3"
      ></v-text-field>
    </v-responsive>
  </form>
</template>

<script setup>
import { ref, inject } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { getCountryByName } from "../api/countryApi";

const emit = defineEmits(["nameFilterChange"]);
const search = ref(null);
const errorNotification = inject("errorNotification");

const handleInput = useDebounceFn(() => {
  getCountriesBySearchFromAPI(search.value);
}, 500);

const getCountriesBySearchFromAPI = async (name) => {
  let nameFilter;
  try {
    if (!name || name === "") {
      nameFilter = false;
    } else {
      const data = await getCountryByName(name);
      nameFilter = data;
    }
    emit("nameFilterChange", nameFilter);
  } catch (e) {
    console.log(e);
    errorNotification.emit("catch-error", e.message);
  }
};
</script>
