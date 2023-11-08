<template>
  <div
    class="lg:tw-px-8 lg:tw-py-8 tw-px-4 tw-py-6 tw-h-full tw-flex tw-flex-col"
  >
    <div class="tw-flex tw-justify-between">
      <div class="tw-flex tw-items-center">
        <div class="tw-h-10 tw-mr-2">
          <img
            :src="props.country.flags.svg"
            :alt="props.country.flag"
            class="tw-object-cover tw-h-full tw-w-full tw-border tw-border-b-gray-300"
          />
        </div>
        <div class="tw-flex tw-flex-col">
          <h3 class="tw-font-bold md:tw-text-lg">
            {{ props.country.name.common }}
          </h3>
          <p v-if="capitals" class="tw-flex tw-items-baseline">
            <MapPinIcon class="tw-h-4 tw-w-4 tw-text-gray-500 tw-mr-1" />{{
              capitals
            }}
          </p>
        </div>
      </div>
      <router-link :to="props.country.cca2">
        <OpenInNewIcon class="tw-h-4 tw-w-4 tw-text-gray-500" />
      </router-link>
    </div>

    <div class="tw-flex tw-flex-col tw-mt-4">
      <p
        class="tw-p-1 tw-text tw-flex tw-items-center"
        v-if="props.country.independent"
      >
        <ShieldCheckOutlineIcon
          class="tw-h-4 tw-w-4 tw-text-gray-500 tw-mr-1"
        />
        Independent country
      </p>
      <p
        v-if="subregion"
        class="tw-text tw-p-1 tw-rounded-lg tw-flex tw-items-center"
      >
        <GlobeAsiaAustraliaIcon
          class="tw-h-4 tw-w-4 tw-text-gray-500 tw-mr-1"
        />{{ subregion }}
      </p>
      <p class="tw-p-1 tw-text tw-flex tw-items-center">
        <CarOutlineIcon class="tw-h-4 tw-w-4 tw-text-gray-500 tw-mr-1" />
        {{ props.country.car.side === "right" ? "Right" : "Left" }}-hand traffic
      </p>
      <p class="tw-p-1 tw-text tw-flex tw-items-center">
        <LanguageIcon class="tw-h-4 tw-w-4 tw-text-gray-500 tw-mr-1" />
        {{ languages }}
      </p>
      <div class="tw-p-1 tw-text tw-flex tw-items-center" v-if="translatedLang">
        <CheckAllIcon class="tw-h-4 tw-w-4 tw-text-gray-500 tw-mr-1" />
        Support translation
      </div>
    </div>

    <div class="tw-flex tw-mt-4">
      <AddToVisitedButton :country="props.country" />
      <AddToWantedButton :country="props.country" />
    </div>
  </div>
  <hr class="tw-text-gray-200 md:tw-hidden" />
</template>

<script setup>
import { computed, inject } from "vue";
import { languageCodes } from "../assets/data/languageCodes.js";
import {
  MapPinIcon,
  GlobeAsiaAustraliaIcon,
  LanguageIcon,
} from "@heroicons/vue/24/outline";
import {
  ShieldCheckOutlineIcon,
  CarOutlineIcon,
  CheckAllIcon,
  OpenInNewIcon,
} from "mdi-vue3";
import AddToVisitedButton from "./AddToVisitedButton.vue";
import AddToWantedButton from "./AddToWantedButton.vue";

const props = defineProps({
  country: Object,
});

const errorNotification = inject("errorNotification");

const capitals = computed(() => {
  try {
    const capital = props.country.capital;
    if (capital && Array.isArray(capital) && capital.length > 0) {
      return capital[0];
    }
  } catch (e) {
    console.log(e);
    errorNotification.emit(
      "catch-error",
      `No capital on ${props.country.name.common}`
    );
  }
});

const subregion = computed(() => {
  try {
    const subregion = props.country.subregion;
    if (subregion) {
      return subregion;
    }
  } catch (e) {
    console.log(e);
    errorNotification.emit(
      "catch-error",
      `No subregion on ${props.country.name.common}`
    );
  }
});

const languages = computed(() => {
  try {
    if (props.country.languages) {
      const languageValues = Object.values(props.country.languages);
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
      `No languages on ${props.country.name.common}`
    );
  }
});

const translatedLang = computed(() => {
  if (props.country.languages) {
    const languageValues = Object.values(props.country.languages);
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
</script>
