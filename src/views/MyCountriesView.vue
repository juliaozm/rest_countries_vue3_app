<template>
  <Suspense>
    <template #default>
      <div>
        <TravelGoals
          v-if="wantedCountriesCount > 0 && visitedCountriesCount > 0"
          :visitedCountriesCount="visitedCountriesCount"
          :wantedCountriesCount="wantedCountriesCount"
        />
        <section
          class="lg:tw-w-[900px] lg:tw-mx-auto tw-px-4 tw-flex tw-flex-col min-[375px]:tw-flex-row"
        >
          <MyCountriesList
            title="Visited countries:"
            :myCountries="visitedCountries"
            :error="visitedCountriesError"
            :count="visitedCountriesCount"
          />
          <MyCountriesList
            title="Wanted countries:"
            :myCountries="wantedCountries"
            :error="wantedCountriesError"
            :count="wantedCountriesCount"
          />
        </section>
      </div>
    </template>
    <template #fallback>
      <LoaderItem text="Loading travel goals" />
    </template>
  </Suspense>
</template>
<script setup>
import { ref, onMounted, inject, computed, defineAsyncComponent } from "vue";
import { getCountries } from "../api/firebase/getCountries.js";
import LoaderItem from "../components/UI/LoaderItem.vue";
const TravelGoals = defineAsyncComponent(() =>
  import("../components/TravelGoals.vue")
);
const MyCountriesList = defineAsyncComponent(() =>
  import("../components/MyCountriesList.vue")
);

const user = inject("user");
const uid = computed(() => user.currentUser?.uid);
const visitedCountries = ref({});
const visitedCountriesError = ref("");
const wantedCountries = ref({});
const wantedCountriesError = ref("");

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
  Promise.all([
    fetchCountries("visitedCountries", visitedCountries, visitedCountriesError),
    fetchCountries("wantedCountries", wantedCountries, wantedCountriesError),
  ]);
});

const visitedCountriesCount = computed(() => visitedCountries.value.length);
const wantedCountriesCount = computed(() => wantedCountries.value.length);
</script>
