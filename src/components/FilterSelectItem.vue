<template>
  <v-select
    :value="value"
    :items="items"
    :placeholder="placeholder"
    clearable
    :item-title="itemTitle"
    :item-value="itemValue"
    :clear-icon="CloseCircleIcon"
    variant="outlined"
    bg-color="#fff"
    color="primary"
    item-color="primary"
    base-color="primary"
    hide-no-data
    @input="$emit('input', value)"
  ></v-select>
</template>

<script>
import { CloseCircleIcon } from "mdi-vue3";
export default {
  name: "FilterSelectItem",
  components: { CloseCircleIcon },
  props: {
    value: {
      type: String,
    },
    itemTitle: {
      type: String,
    },
    itemValue: {
      type: String,
    },
    items: {
      type: Array,
      default: () => [],
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      CloseCircleIcon,
    };
  },
};
</script>
