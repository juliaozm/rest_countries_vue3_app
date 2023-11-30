<template>
  <section
    class="tw-grid tw-items-center tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-4 tw-h-full"
  >
    <picture v-for="(url, i) in photoUrls" :key="i">
      <img
        :src="url"
        alt="Unsplash photo"
        class="tw-object-contain"
        width="300"
        height="300"
        loading="lazy"
      />
    </picture>
  </section>
  <div ref="trigger" class="tw-h-8 tw-bg-transparent"></div>

  <p v-if="!isLoading && page > totalPages" class="tw-italic tw-text-center">
    No more photos found
  </p>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { getPhotos } from "../api/unsplashApi.js";

const props = defineProps({
  country: Object,
});

const photoUrls = ref([]);
const page = ref(1);
const totalPages = ref(null);
const isLoading = ref(true);
const trigger = ref(null);
const errorList = ref("");
const errorNotification = inject("errorNotification");
const searchText = computed(() => {
  return props.country.name.common;
});

const getPhotoURLs = async (tag) => {
  errorList.value = "";
  isLoading.value = true;
  try {
    const res = await getPhotos(tag);
    totalPages.value = res.total_pages;
    const photos = res.results;
    photoUrls.value = photos.map((photo) => photo.urls?.small);
  } catch (e) {
    console.log(e);
    errorList.value = e.message;
    errorNotification.emit("catch-error", errorList.value);
  } finally {
    isLoading.value = false;
  }
};

getPhotoURLs(searchText.value);

const loadMorePhotos = async (tag) => {
  errorList.value = "";
  isLoading.value = true;
  try {
    page.value += 1;
    const res = await getPhotos(tag, page.value);
    const photos = res.results;
    photoUrls.value = [
      ...photoUrls.value,
      ...photos.map((photo) => photo.urls?.small),
    ];
  } catch (e) {
    console.log(e);
    errorList.value = e.message;
    errorNotification.emit("catch-error", errorList.value);
  } finally {
    isLoading.value = false;
  }
};

useIntersectionObserver(trigger, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    loadMorePhotos(searchText.value);
  }
});
</script>
