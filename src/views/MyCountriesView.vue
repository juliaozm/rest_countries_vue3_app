<template>
  <LoaderItem v-if="isLoading" :text="loadingText" />
  <section v-else>
    <TravelGoals
      v-if="wantedCountriesCount > 0 && visitedCountriesCount > 0"
      :visitedCountriesCount="visitedCountriesCount"
      :wantedCountriesCount="wantedCountriesCount"
    />
    <div class="lg:tw-container lg:tw-mx-auto tw-px-4 tw-flex">
      <div class="tw-flex-col tw-w-1/2">
        <h2 class="tw-font-bold tw-text-lg tw-text-center">
          Visited countries:
        </h2>
        <Suspense>
          <template #default
            ><MyCountriesList
              :myCountries="visitedCountries"
              :error="visitedCountriesError"
              :count="visitedCountriesCount"
          /></template>
          <template #fallback> Loading visited countries... </template>
        </Suspense>
      </div>

      <div class="tw-flex-col tw-w-1/2">
        <h2 class="tw-font-bold tw-text-lg tw-text-center">
          Wanted countries:
        </h2>
        <Suspense>
          <template #default
            ><MyCountriesList
              :myCountries="wantedCountries"
              :error="wantedCountriesError"
              :count="wantedCountriesCount"
          /></template>
          <template #fallback> Loading visited countries... </template>
        </Suspense>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, onMounted, inject, computed, defineAsyncComponent } from "vue";
import { getCountries } from "../api/firebase/getCountries.js";
const MyCountriesList = defineAsyncComponent(() =>
  import("../components/MyCountriesList.vue")
);
import TravelGoals from "../components/TravelGoals.vue";
import LoaderItem from "../components/UI/LoaderItem.vue";

const providedUser = inject("user");
const uid = computed(() => providedUser?.value?.uid);

const visitedCountries = ref({});
const visitedCountriesError = ref("");
const wantedCountries = ref({});
const wantedCountriesError = ref("");
const isLoading = ref(false);
const loadingText = ref("The lists of countries are fetching...");

const fetchCountries = async (collection, targetRef, errorRef) => {
  try {
    const data = await getCountries(uid.value, collection);
    const countries = Object.entries(data).map((country) => country[1]);
    targetRef.value = countries;
    errorRef.value = "";
  } catch (error) {
    targetRef.value = [];
    errorRef.value = `No ${
      collection === "visitedCountries" ? "visited" : "wanted"
    } countries yet`;
    console.error(`Error fetching ${collection} countries:`, error);
  }
};
onMounted(async () => {
  isLoading.value = true;
  Promise.all([
    fetchCountries("visitedCountries", visitedCountries, visitedCountriesError),
    fetchCountries("wantedCountries", wantedCountries, wantedCountriesError),
  ]);

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});

const visitedCountriesCount = computed(() => visitedCountries.value.length);
const wantedCountriesCount = computed(() => wantedCountries.value.length);
</script>
