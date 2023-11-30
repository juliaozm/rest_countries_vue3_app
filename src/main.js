import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "./index.css";
import { vuetify } from "../plugins/vuetify";
import mitt from "mitt";
import { getAuth } from "firebase/auth";
import { appAuth } from "../firebase.config.js";

const app = createApp(App);
const errorNotification = mitt();
const user = getAuth(appAuth);
// Global error handler
app.config.errorHandler = (error, instance, info) => {
  console.error("Global error:", error);
  console.log("Vue instance:", instance);
  console.log("Error info:", info);

  // Add code for UI notifications
  errorNotification.emit("catch-error", error);
};

app.provide("errorNotification", errorNotification);
app.provide("user", user);
app.use(router).use(vuetify).mount("#app");
