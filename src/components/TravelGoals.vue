<template>
  <section class="tw-px-4 tw-py-8">
    <h1 class="tw-mb-5 tw-text-2xl tw-font-bold tw-text-center">
      Travel Goals
    </h1>
    <div
      class="tw-flex tw-flex-col sm:tw-flex-row tw-w-full tw-mx-auto tw-justify-center"
    >
      <div class="tw-flex tw-flex-col tw-items-center tw-mx-8 tw-my-4">
        <p>I've visited</p>
        <p class="tw-font-bold tw-text-lg">
          {{ props.visitedCountriesCount }}
        </p>
        <p>countries so far</p>
      </div>
      <div class="tw-flex tw-flex-col tw-items-center tw-mx-8 tw-my-4">
        <p>It's</p>
        <p class="tw-font-bold tw-text-lg">{{ visitedOfTheWorld }}%</p>
        <p>of the world!</p>
      </div>
      <div class="tw-flex tw-flex-col tw-items-center tw-mx-8 tw-my-4">
        <p>My goal is achieved by</p>
        <p class="tw-font-bold tw-text-lg">
          {{ goalReached }}% and {{ props.wantedCountriesCount }}
        </p>
        <p>countries more to go!</p>
      </div>
    </div>
  </section>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  visitedCountriesCount: Number,
  wantedCountriesCount: Number,
});

const visitedOfTheWorld = computed(
  () => (props.visitedCountriesCount / 250) * 100
);

const goalReached = computed(() => {
  const total = props.visitedCountriesCount + props.wantedCountriesCount;
  return total !== 0
    ? Math.ceil(
        (props.visitedCountriesCount /
          (props.visitedCountriesCount + props.wantedCountriesCount)) *
          100
      )
    : 0;
});
</script>
