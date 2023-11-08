<template>
  <button @click="handleClick" :class="class" :disabled="disabled">
    <span v-if="icon">
      <component
        :is="icon"
        class="tw-text-gray-100 tw-border-violet-700 tw-bg-violet-700 tw-p-1 tw-rounded hover:tw-bg-violet-800 tw-transition-all active:tw-bg-violet-900"
      ></component>
    </span>
  </button>
</template>
<script setup>
const props = defineProps({
  icon: Object,
  handleClick: Function,
  class: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});
</script>
