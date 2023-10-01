<template>
  <form @submit.prevent="getTranslated">
    <p>Enter text:</p>
    <input v-model="text" placeholder="Edit me" />
    <button>Translate</button>
    <div>Translate: {{ translatedText }}</div>
  </form>
</template>

<script>
import { ref, inject } from "vue";
import { postTranslate } from "../api/translateApi";

export default {
  name: "TranslateForm",
  props: {
    lang: {
      type: String,
      required: true,
    },
  },
  async setup({ lang }) {
    const text = ref("");
    const translatedText = ref("");
    const error = ref("");
    const errorNotification = inject("errorNotification");

    const getTranslated = () => {
      error.value = "";
      try {
        const encodedParams = new URLSearchParams();
        encodedParams.set("q", text.value);
        encodedParams.set("target", lang);
        encodedParams.set("source", "en");
        submitTranslate(encodedParams);
      } catch (e) {
        console.log(e);
        error.value = "Sorry, it cannot be translated";
        errorNotification.emit("catch-error", error.value);
      }
    };

    const submitTranslate = async (data) => {
      error.value = "";
      try {
        const response = await postTranslate(data);
        translatedText.value = response.data.translations[0].translatedText;
      } catch (e) {
        console.log(e);
        error.value = e.message;
        errorNotification.emit("catch-error", error.value);
      }
    };
    return {
      text,
      translatedText,
      getTranslated,
      error,
    };
  },
};
</script>
