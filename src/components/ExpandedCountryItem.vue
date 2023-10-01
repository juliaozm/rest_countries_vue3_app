<template>
  <div v-if="error">{{ error }}</div>
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
import { ref, computed, inject } from "vue";
import { getCountryByCode } from "../api/countryApi";
import { languageCodes } from "../assets/data/languageCodes.js";
import TranslateForm from "../components/TranslateForm.vue";

export default {
  name: "ExpandedCountryItem",
  components: { TranslateForm },
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

    return {
      country,
      error,
      translatedLang,
    };
  },
};
</script>
