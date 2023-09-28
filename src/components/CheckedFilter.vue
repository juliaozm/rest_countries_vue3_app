<template>
  <div class="w-full sm:w-1/3 md:w-1/4">
    <v-checkbox v-model="isChecked" label="Support translation" color="primary">
      <template #label>
        <span class="text-lg text-gray-500">Support translation</span>
      </template>
    </v-checkbox>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "CheckedFilter",
  props: {
    getCheckedCountries: {
      type: Function,
      required: true,
    },
  },

  setup({ getCheckedCountries }) {
    const isChecked = ref(false);

    watch(isChecked, (newValue) => {
      getCheckedCountries(newValue);
    });

    return {
      isChecked,
    };
  },
};
</script>
