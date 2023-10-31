<template>
  <div>
    <img
      v-if="props.url"
      :src="props.url"
      alt="Unsplash photo"
      class="tw-object-contain"
      isLoading="lazy"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  url: String,
});
</script>
