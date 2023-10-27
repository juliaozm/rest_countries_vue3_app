<template>
  <button
    @click="handleClick"
    class="tw-bg-violet-700 hover:tw-bg-violet-800 :active:tw-bg-violet-900 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-border tw-border-violet-700 tw-rounded"
  >
    <slot></slot>
  </button>
</template>
<script>
export default {
  name: "ButtonPrimary",
  props: {
    handleClick: {
      type: Function,
    },
  },
};
</script>
