<template></template>

<script>
import { inject } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ToastError",
  setup() {
    const errorNotification = inject("errorNotification");

    errorNotification.on("catch-error", (value) => {
      // *Listen* for event
      toast.error(value, {
        autoClose: 600,
      });
    });
  },
};
</script>
