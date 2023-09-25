<template>
  <form @submit.prevent="getTranslated">
    <p>Enter text:</p>
    <input v-model="text" placeholder="Edit me" />
    <button>Translate</button>
    <div>Translate: {{ translatedText }}</div>
  </form>
  <ToastError v-if="error" :message="error" />
</template>

<script>
import { ref } from "vue";
import { postTranslate } from "../utils/translateApi";
import ToastError from "./ToastError.vue";
export default {
  name: "TranslateForm",
  components: { ToastError },
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

    const getTranslated = () => {
      try {
        const encodedParams = new URLSearchParams();
        encodedParams.set("q", text.value);
        encodedParams.set("target", lang);
        encodedParams.set("source", "en");
        submitTranslate(encodedParams);
      } catch (e) {
        error.value = "Sorry, it cannot be translated";
      }
    };

    const submitTranslate = async (data) => {
      error.value = "";
      try {
        const response = await postTranslate(data);
        translatedText.value = response.data.translations[0].translatedText;
      } catch (e) {
        error.value = e.message;
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
