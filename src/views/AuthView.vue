<template>
  <section v-if="providedUser">
    <LogoutForm :email="userEmail"></LogoutForm>
  </section>
  <section v-if="!providedUser && registered">
    <SignInForm :handleClick="() => (registered = false)" />
  </section>
  <section v-if="!providedUser && !registered">
    <SignUpForm :handleClick="() => (registered = true)" />
  </section>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";
import LogoutForm from "../components/LogoutForm.vue";

const providedUser = inject("user");
const userEmail = computed(() => providedUser.value.email);
const registered = ref(true);
</script>
