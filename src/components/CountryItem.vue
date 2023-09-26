<template>
  <ToastError v-if="errors.length > 0" :message="errors[0]" />
  <router-link :to="country.cca2">
    <div class="p-4 border h-full flex flex-col">
      <div class="h-1/2 m-2">
        <img
          :src="country.flags.svg"
          :alt="country.flag"
          class="object-cover h-full w-full border border-b-gray-300"
        />
      </div>
      <div class="flex flex-col justify-between h-24 mt-6 mx-2">
        <h3 class="text-2xl">{{ country.name.common }}</h3>
        <p>
          Indepentend:
          <input
            type="checkbox"
            readonly
            disabled
            :checked="country.independent"
          />
        </p>
        <p>Capital: {{ capitals }}</p>
        <p>Continents: {{ continents }}</p>
        <p>Languages: {{ languages }}</p>
        <p>Cars: {{ country.car.side }}-handed</p>
        <p>
          Available to translate:
          <input
            type="checkbox"
            readonly
            disabled
            :checked="translatedLang != 'en' && translatedLang != 'n/a'"
          />
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed, ref } from "vue";
import ToastError from "./ToastError.vue";
import { languageCodes } from "../utils/languageCodes.js";
export default {
  name: "CountryItem",
  components: { ToastError },
  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  async setup({ country }) {
    const errors = ref([]);

    const capitals = computed(() => {
      try {
        return country.capital && country.capital.length > 0
          ? country.capital[0]
          : "None";
      } catch (error) {
        errors.value.push(`No capital on ${country.name.common}`);
      }
    });

    const continents = computed(() => {
      try {
        return country.continents.length < 2
          ? country.continents[0]
          : country.continents.join(", ");
      } catch (error) {
        errors.value.push(`No continents on ${country.name.common}`);
      }
    });

    const languages = computed(() => {
      try {
        return country.languages && Object.values(country.languages).length < 2
          ? Object.values(country.languages)[0]
          : Object.values(country.languages).join(", ");
      } catch (error) {
        errors.value.push(`No languages on ${country.name.common}`);
      }
    });

    const translatedLang = computed(() => {
      try {
        return languageCodes.find(
          (item) => item.name === Object.values(country.languages)[0]
        ).code;
      } catch (e) {
        return "n/a";
      }
    });

    return {
      capitals,
      continents,
      languages,
      errors,
      translatedLang,
    };
  },
};
</script>
