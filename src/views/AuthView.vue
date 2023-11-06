<template>
  <section
    v-if="registered"
    class="tw-flex tw-flex-col tw-items-center tw-mt-6 tw-p-4"
  >
    <p class="tw-my-4 tw-text-2xl tw-font-bold">Welcome back</p>
    <SignInForm />
    <p class="tw-my-3">
      Don't have an account?
      <button
        @click="() => (registered = false)"
        class="tw-text-violet-500 hover:tw-text-violet-600"
      >
        Sign up
      </button>
    </p>
  </section>
  <section v-else class="tw-flex tw-flex-col tw-items-center tw-mt-6 tw-p-4">
    <p class="tw-my-4 tw-text-2xl tw-font-bold">Create an account</p>
    <SignUpForm />
    <p class="tw-my-3">
      Already have an account?
      <button
        @click="() => (registered = true)"
        class="tw-text-violet-500 hover:tw-text-violet-600"
      >
        Login
      </button>
    </p>
  </section>
</template>

<script setup>
import { ref } from "vue";
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";

const registered = ref(true);
</script>
