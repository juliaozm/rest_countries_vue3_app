<template>
  <div class="w-full flex justify-center items-center">
    <form class="p-4 flex" @submit.prevent="getCountriesBySearch(search)">
      <input
        type="text"
        v-model.trim.lazy="search"
        id="searchbar"
        placeholder="Search for country..."
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mr-3"
      />
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
      >
        Search
      </button>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SearchBar",
  props: {
    getCountriesBySearch: {
      type: Function,
      required: true,
    },
  },
  setup() {
    const search = ref(null);

    return {
      search,
    };
  },
};
</script>
