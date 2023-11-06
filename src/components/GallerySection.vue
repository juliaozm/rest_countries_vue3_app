<template>
  <section
    class="tw-grid tw-items-center tw-grid-cols-2 sm:tw-grid-cols-3 lg:tw-grid-cols-4 xl:tw-grid-cols-5 tw-gap-4 tw-h-full"
  >
    <GalleryItem v-for="url in photoUrls" :key="url" :url="url" />
  </section>
  <div ref="trigger" class="tw-h-8 tw-bg-transparent"></div>
  <LoaderItem v-if="isLoading" :text="loadingText" />
  <p v-if="!isLoading && page > totalPages" class="tw-italic tw-text-center">
    No more photos found
  </p>
</template>

<script setup>
import { ref, computed, inject } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
import { getPhotos } from "../api/unsplashApi.js";
import LoaderItem from "../components/UI/LoaderItem.vue";
import GalleryItem from "../components/GalleryItem.vue";

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

const loadingText = computed(
  () => `The photos from ${searchText.value} are fetching...`
);

const getPhotoURLs = async (tag) => {
  errorList.value = "";
  isLoading.value = true;
  try {
    const res = await getPhotos(tag);
    totalPages.value = res.total_pages;
    const photos = res.results;
    photoUrls.value = photos.map((photo) => photo.urls?.regular);
  } catch (e) {
    console.log(e);
    errorList.value = e.message;
    errorNotification.emit("catch-error", errorList.value);
  } finally {
    isLoading.value = false;
  }
};

const loadMorePhotos = async (tag) => {
  errorList.value = "";
  isLoading.value = true;
  try {
    page.value += 1;
    const res = await getPhotos(tag, page.value);
    const photos = res.results;
    photoUrls.value = [
      ...photoUrls.value,
      ...photos.map((photo) => photo.urls?.regular),
    ];
  } catch (e) {
    console.log(e);
    errorList.value = e.message;
    errorNotification.emit("catch-error", errorList.value);
  } finally {
    isLoading.value = false;
  }
};

getPhotoURLs(searchText.value);
useIntersectionObserver(trigger, ([{ isIntersecting }]) => {
  if (isIntersecting) {
    loadMorePhotos(searchText.value);
  }
});
</script>