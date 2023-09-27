import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import "./index.css";
import { vuetify } from "../plugins/vuetify";

createApp(App).use(router).use(vuetify).mount("#app");
