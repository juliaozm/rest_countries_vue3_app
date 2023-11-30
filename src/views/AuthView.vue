<template>
  <section v-if="user.currentUser">
    <LogoutForm :email="userEmail"></LogoutForm>
  </section>
  <section v-if="!user.currentUser && registered">
    <SignInForm :handleClick="() => (registered = false)" />
  </section>
  <section v-if="!user.currentUser && !registered">
    <SignUpForm :handleClick="() => (registered = true)" />
  </section>
</template>

<script setup>
import { ref, inject, computed } from "vue";
import SignInForm from "../components/SignInForm.vue";
import SignUpForm from "../components/SignUpForm.vue";
import LogoutForm from "../components/LogoutForm.vue";

const user = inject("user");
const userEmail = computed(() => user.currentUser?.email);

const registered = ref(true);
</script>
