<template>
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
          <input type="checkbox" readonly disabled :checked="translatedLang" />
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
import { computed, inject } from "vue";
import { languageCodes } from "../assets/data/languageCodes.js";
export default {
  name: "CountryItem",

  props: {
    country: {
      type: Object,
      required: true,
    },
  },
  async setup({ country }) {
    const errorNotification = inject("errorNotification");

    const capitals = computed(() => {
      try {
        const capital = country.capital;
        if (capital && Array.isArray(capital) && capital.length > 0) {
          return capital[0];
        } else {
          return "None";
        }
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `No capital on ${country.name.common}`
        );
      }
    });

    const continents = computed(() => {
      try {
        const continents = country.continents;
        if (continents && Array.isArray(continents) && continents.length > 0) {
          return continents < 2 ? continents[0] : continents.join(", ");
        } else {
          return "None";
        }
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `No continents on ${country.name.common}`
        );
      }
    });

    const languages = computed(() => {
      try {
        if (country.languages) {
          const languageValues = Object.values(country.languages);
          if (languageValues?.length > 0) {
            return languageValues.length < 2
              ? languageValues[0]
              : languageValues.join(", ");
          } else {
            return "None";
          }
        } else {
          return "None";
        }
      } catch (e) {
        console.log(e);
        errorNotification.emit(
          "catch-error",
          `No languages on ${country.name.common}`
        );
      }
    });

    const translatedLang = computed(() => {
      if (country.languages) {
        const languageValues = Object.values(country.languages);
        if (languageValues?.length > 0) {
          const lang = languageCodes.find(
            (lang) =>
              lang.name &&
              lang.name === languageValues[0] &&
              languageValues[0] !== "English"
          );
          return lang ? lang.code : false;
        }
      }
    });

    return {
      capitals,
      continents,
      languages,
      translatedLang,
    };
  },
};
</script>
