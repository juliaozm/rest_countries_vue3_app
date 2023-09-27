import { createVuetify } from "vuetify";
import { VSelect } from "vuetify/components";
import "vuetify/styles";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.min.css"; // Import the MDI CSS

export const vuetify = createVuetify({
  VSelect,
});
