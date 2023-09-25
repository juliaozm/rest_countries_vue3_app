<template>
  <ToastError v-if="error" :message="error"></ToastError>
  <div v-else>
    <h1>{{ country.name.common }}</h1>
    <p>Area: {{ country.area }}, population: {{ country.population }}</p>
    <p>Subregion: {{ country.subregion }}</p>
    <div>
      <img :src="country.flags.svg" :alt="country.flag" />
    </div>
    <TranslateForm
      v-if="translatedLang != 'en' && translatedLang != 'n/a'"
      :lang="translatedLang"
    />
  </div>
</template>
<script>
import { ref, computed } from "vue";
import { getCountryByCode } from "../utils/countryApi";
import { languageCodes } from "../utils/languageCodes.js";
import TranslateForm from "../components/TranslateForm.vue";
import ToastError from "../components/ToastError.vue";
export default {
  name: "ExpandedCountryItem",
  components: { TranslateForm, ToastError },
  props: {
    id: String,
    required: true,
  },
  async setup({ id }) {
    const country = ref({});
    const error = ref("");

    const getDataFromAPI = async (id) => {
      try {
        country.value = await getCountryByCode(id);
      } catch (e) {
        error.value = e.message;
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

    return {
      country,
      error,
      translatedLang,
    };
  },
};
</script>
