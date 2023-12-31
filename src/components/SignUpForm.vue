<template>
  <div class="tw-flex tw-flex-col tw-items-center tw-mt-6 tw-p-4">
    <p class="tw-my-4 tw-text-2xl tw-font-bold">Create an account</p>
    <v-sheet
      class="tw-w-full sm:tw-container md:tw-w-1/2 lg:tw-w-1/3 tw-mx-auto"
    >
      <v-form ref="form" fast-fail @submit.prevent="validate">
        <v-text-field
          v-model="email"
          label="Email"
          :rules="emailRules"
          required
          variant="outlined"
          color="primary"
          item-color="primary"
          base-color="primary"
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          :rules="passwordRules"
          required
          variant="outlined"
          color="primary"
          item-color="primary"
          base-color="primary"
        ></v-text-field>

        <v-btn
          type="submit"
          variant="tonal"
          color="primary"
          item-color="primary"
          base-color="primary"
          block
          class="mt-2"
          :disabled="isLoading"
          >Sign Up</v-btn
        >
      </v-form>
    </v-sheet>
    <p class="tw-my-3">
      Already have an account?
      <button
        @click="props.handleClick"
        class="tw-text-violet-500 hover:tw-text-violet-600"
      >
        Login
      </button>
    </p>
  </div>
</template>
<script setup>
import { ref, inject } from "vue";
import { appAuth } from "../../firebase.config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { writeUserData } from "../api/firebase/writeUserData.js";
import { router } from "../router";

const props = defineProps({
  handleClick: Function,
});

const email = ref("");
const emailRules = [
  (value) => {
    if (
      /^[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)*(\.[a-zA-Z]{2,})+$/.test(
        value
      )
    )
      return true;
    return "Enter your valid email address";
  },
];

const password = ref("");
const passwordRules = [
  (value) => {
    if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(value)) return true;
    return "At least 8 characters — including 1 uppercase letter and 1 number";
  },
];

const form = ref();
const validate = async () => {
  const { valid } = await form.value.validate();
  if (valid) signup();
};

const isLoading = ref(false);
const user = {
  uid: ref(""),
  email: ref(""),
};
const errorList = ref("");
const errorNotification = inject("errorNotification");

const auth = getAuth(appAuth);
const signup = () => {
  isLoading.value = true;

  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const { uid, email } = userCredential.user;
      user.uid.value = uid;
      user.email.value = email;
      Promise.resolve(writeUserData(uid, email)).then(() => router.push("/"));
    })
    .catch((error) => {
      const errorCode = error.code;
      errorList.value = error.message;
      errorNotification.emit("catch-error", errorList.value);
    })
    .finally(() => (isLoading.value = false));
};
</script>
