<template>
  <div id="app">
    <header class="tw-w-full tw-p-4">
      <NavBar />
    </header>
    <main>
      <router-view />
      <ToastError />
    </main>
    <footer></footer>
  </div>
</template>

<script setup>
import NavBar from "./components/UI/NavTab.vue";
import ToastError from "./components/ToastError.vue";
</script>
