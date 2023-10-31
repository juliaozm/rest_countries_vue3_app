<template>
  <div v-if="error">{{ error }}</div>
  <div v-else class="tw-container tw-mx-auto tw-px-4">
    <div class="tw-flex tw-align-end tw-justify-center mb-3 mt-3">
      <div class="tw-h-10 tw-w-10 tw-mr-2 tw-border tw-border-gray-200">
        <img
          :src="country.flags.svg"
          :alt="country.flag"
          class="tw-object-cover tw-h-full tw-w-full"
        />
      </div>
      <h1 class="tw-text-center tw-text-2xl mb-2">{{ country.name.common }}</h1>
    </div>

    <p class="tw-text-center tw-italic mb-6">
      The country located in {{ country.subregion }} region with a population of
      <span class="tw-text-violet-700 tw-font-semibold">{{ population }} </span>
      people. The land area of {{ country.name.common }} is
      <span class="tw-text-violet-700 tw-font-semibold">{{ area }}</span> square
      kilometres.
    </p>

    <TranslateForm
      v-if="translatedLang != 'en' && translatedLang != 'n/a'"
      :lang="translatedLang"
      :language="language"
    />

    <GallerySection v-if="country" :country="country" />
  </div>
</template>
<script>
import { ref, computed, inject } from "vue";
import { getCountryByCode } from "../api/countryApi";
import { languageCodes } from "../assets/data/languageCodes.js";
import TranslateForm from "../components/TranslateForm.vue";
import GallerySection from "../components/GallerySection.vue";

export default {
  name: "CountryViewInfo",
  components: { TranslateForm, GallerySection },
  props: {
    id: String,
    required: true,
  },
  async setup({ id }) {
    const country = ref({});
    const error = ref("");
    const errorNotification = inject("errorNotification");

    const getDataFromAPI = async (id) => {
      error.value = "";
      try {
        country.value = await getCountryByCode(id);
      } catch (e) {
        console.log(e);
        error.value = e.message;
        errorNotification.emit("catch-error", error.value);
      }
    };

    await getDataFromAPI(id);

    const translatedLang = computed(() => {
      if (country.value && country.value.languages) {
        const langCode = languageCodes.find(
          (item) => item.name === Object.values(country.value.languages)[0]
        );
        return langCode ? langCode.code : "n/a";
      }
      return "n/a";
    });

    const population = computed(() =>
      country.value.population.toLocaleString()
    );

    const area = computed(() => country.value.area.toLocaleString());

    const language = computed(() => Object.values(country.value.languages)[0]);

    return {
      country,
      error,
      translatedLang,
      population,
      area,
      language,
    };
  },
};
</script>
