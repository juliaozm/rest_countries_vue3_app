<template>
  <div
    class="tw-flex tw-flex-col tw-w-full min-[375px]:tw-w-1/2 tw-m-4 tw-items-center"
  >
    <h2 class="tw-font-bold tw-text-lg tw-text-center">
      {{ props.title }}
    </h2>

    <div v-if="props.error || props.count === 0">
      <p class="tw-text-center">No countries yet</p>
    </div>

    <ol v-else>
      <li
        v-for="country in props.myCountries"
        class="tw-flex tw-items-center tw-my-4 tw-mx-3 tw-break-words tw-self-center"
      >
        <div class="tw-h-8 lg:tw-h-12 tw-w-8 lg:tw-w-12 tw-mr-4">
          <img
            :src="country.flag"
            :alt="country.name"
            class="tw-object-contain tw-h-full tw-w-full tw-border tw-border-b-gray-300"
          />
        </div>
        <h4
          class="tw-text-sm lg:tw-text-lg tw-font-bold tw-whitespace-pre-line tw-max-w-[100px]"
        >
          {{ country.name }}
        </h4>
      </li>
    </ol>
  </div>
</template>
<script setup>
const props = defineProps({
  myCountries: Object,
  title: String,
  error: String,
  count: Number,
});
</script>
