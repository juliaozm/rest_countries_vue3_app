<template>
  <div class="tw-w-full sm:tw-w-1/2 md:tw-w-40 sm:tw-mr-4">
    <v-checkbox v-model="isChecked" color="primary" density="compact">
      <template #label>
        <span class="tw-text-sm tw-text-gray-500">{{ label }}</span>
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
    label: {
      type: String,
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
