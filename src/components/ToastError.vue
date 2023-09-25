<template></template>
<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
export default {
  name: "ToastError",
  props: { message: "Something went wrong" },
  setup(props) {
    toast.error(props.message, {
      autoClose: 1000,
    });
    return { toast };
  },
};
</script>
