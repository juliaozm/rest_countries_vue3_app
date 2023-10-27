<template></template>
<script>
import { inject } from "vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "ToastError",
  setup() {
    const errorNotification = inject("errorNotification");

    errorNotification.on("catch-error", (error) => {
      if (error) {
        if (typeof error === "string") {
          toast.error(error, { autoClose: 600 });
        } else if (error instanceof Error) {
          console.error("Error Details:", error);
          toast.error("Something went wrong. Please try again.", {
            autoClose: 600,
          });
        } else {
          console.error("Unknown Error Type:", error);
          toast.error("An error occurred. Please try again.", {
            autoClose: 600,
          });
        }
      }
    });
  },
};
</script>
