<template>
  <ButtonIcon
    v-if="uid"
    :icon="isLoading ? DotsCircleIcon : HeartPlusIcon"
    :class="'tw-self-center tw-h-6 tw-w-6'"
    :disabled="isLoading"
    @click="addToTheList(uid, props.country, 'wantedCountries')"
  />

  <v-snackbar
    :timeout="1000"
    color="primary"
    close-on-content-click
    v-model="msgAlert"
  >
    {{ msg }}
  </v-snackbar>
</template>
<script setup>
import { ref, inject, computed } from "vue";
import ButtonIcon from "./UI/ButtonIcon.vue";
import { HeartPlusIcon, DotsCircleIcon } from "mdi-vue3";
import { updateCountries } from "../api/firebase/updateCountries.js";
import { checkCountryInList } from "../api/firebase/checkCountryInList.js";
import { deleteCountryFromList } from "../api/firebase/deleteCountryFromList.js";

const props = defineProps({
  country: Object,
});

const providedUser = inject("user");
const uid = computed(() => providedUser?.value?.uid);
const msgAlert = ref(false);
const msg = ref("");
const isLoading = ref(false);
const errorList = ref("");
const errorNotification = inject("errorNotification");

const addToTheList = (uid, { cca2, name, flags }, countries) => {
  isLoading.value = true;
  errorList.value = "";
  msg.value = "";
  msgAlert.value = false;

  checkCountryInList(uid, cca2, countries)
    .then((data) => {
      if (data !== null) {
        deleteCountryFromList(uid, cca2, countries).then((message) => {
          msg.value = message;
          msgAlert.value = true;
        });
      } else {
        updateCountries(uid, { cca2, name, flags }, countries).then(
          (message) => {
            msg.value = message;
            msgAlert.value = true;
          }
        );
      }
    })
    .catch((e) => {
      errorList.value = e.message;
      errorNotification.emit("catch-error", errorList.value);
    })
    .finally(() => {
      setTimeout(() => {
        isLoading.value = false;
      }, 500);
    });
};
</script>
