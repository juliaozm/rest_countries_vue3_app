<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-mt-6 tw-p-4">
    <p class="tw-my-4 tw-text-2xl tw-font-bold">Hi, {{ props.email }}</p>
    <p class="tw-my-3">
      Want to leave?
      <v-form ref="form" fast-fail @submit.prevent="logout">
        <v-btn
          type="submit"
          variant="tonal"
          color="primary"
          item-color="primary"
          base-color="primary"
          block
          class="mt-2"
          :disabled="isLoading"
          >Log Out</v-btn
        >
      </v-form>
    </p>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { appAuth } from "../../firebase.config";
import { getAuth, signOut } from "firebase/auth";
import { router } from "../router";

const props = defineProps({
  email: String,
});

const isLoading = ref(false);
const errorList = ref("");
const errorNotification = inject("errorNotification");

const auth = getAuth(appAuth);
const logout = () => {
  isLoading.value = true;
  signOut(auth)
    .then(() => {
      console.log("Your have been logout");
      router.push("/");
    })
    .catch((error) => {
      const errorCode = error.code;
      errorList.value = error.message;
      errorNotification.emit("catch-error", errorList.value);
    })
    .finally(() => (isLoading.value = false));
};
</script>
