<template>
  <form @submit.prevent="getTranslated">
    <div class="tw-flex tw-flex-col md:tw-flex-row lg:tw-justify-center">
      <v-textarea
        v-model="text"
        placeholder="Enter text here"
        clearable
        label="From English"
        variant="outlined"
        color="primary"
        item-color="primary"
        base-color="primary"
        class="xl:tw-max-w-1/3"
        @click:control="() => (translatedText = '')"
      ></v-textarea>
      <ButtonIcon
        :icon="loading ? DotsCircleIcon : TranslateVariantIcon"
        :class="'tw-self-center tw-mb-6 tw-mr-3 tw-ml-3 tw-h-11 tw-w-11'"
        :disabled="loading"
        @click="getTranslated"
      />
      <v-textarea
        v-model="translatedText"
        placeholder="Translated text will be here"
        readonly
        :label="`To ${props.language}`"
        variant="outlined"
        color="primary"
        item-color="primary"
        base-color="primary"
        class="xl:tw-max-w-1/3 tw-italic"
      ></v-textarea>
    </div>
  </form>
</template>

<script setup>
import { ref, inject } from "vue";
import { postTranslate } from "../api/translateApi";
import ButtonIcon from "../components/UI/ButtonIcon.vue";
import { TranslateVariantIcon, DotsCircleIcon } from "mdi-vue3";

const props = defineProps({
  lang: String,
  language: String,
});

const text = ref("");
const translatedText = ref(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
);
const loading = ref(false);
const error = ref("");
const errorNotification = inject("errorNotification");

const getTranslated = () => {
  error.value = "";
  try {
    if (text.value) {
      const encodedParams = new URLSearchParams();
      encodedParams.set("q", text.value);
      encodedParams.set("target", props.lang);
      encodedParams.set("source", "en");
      submitTranslate(encodedParams);
    }
  } catch (e) {
    console.log(e);
    error.value = "Sorry, it cannot be translated";
    errorNotification.emit("catch-error", error.value);
  }
};

const submitTranslate = async (data) => {
  error.value = "";
  try {
    loading.value = true;
    const response = await postTranslate(data);
    translatedText.value = response.data.translations[0].translatedText;
  } catch (e) {
    console.log(e);
    error.value = e.message;
    errorNotification.emit("catch-error", error.value);
  } finally {
    loading.value = false;
  }
};
</script>
