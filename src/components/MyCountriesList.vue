<template>
  <div class="tw-flex-col tw-w-1/2">
    <h2 class="tw-font-bold tw-text-lg tw-text-center">
      {{ props.title }}
    </h2>
    <div v-if="props.error || props.count === 0">
      <p class="tw-text-center">No countries yet</p>
    </div>
    <div class="tw-flex tw-flex-wrap tw-justify-center" v-else>
      <ul v-for="country in props.myCountries">
        <li class="tw-my-4 tw-mx-3 tw-break-words tw-self-center">
          <div class="tw-h-16 tw-w-16 tw-mr-2">
            <img
              :src="country.flag"
              :alt="country.name"
              class="tw-object-contain tw-h-full tw-w-full tw-border tw-border-b-gray-300"
            />
          </div>
          <h4 class="tw-font-bold tw-whitespace-pre-line tw-max-w-[100px]">
            {{ country.name }}
          </h4>
        </li>
      </ul>
    </div>
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
