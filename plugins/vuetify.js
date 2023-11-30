import { createVuetify } from "vuetify";
import {
  VSelect,
  VSnackbar,
  VForm,
  VBtn,
  VResponsive,
  VTextField,
  VSheet,
  VTextarea,
  VCheckbox,
} from "vuetify/components";
import "vuetify/styles";
import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.min.css"; // Import the MDI CSS

export const vuetify = createVuetify({
  VSelect,
  VSnackbar,
  VForm,
  VBtn,
  VResponsive,
  VTextField,
  VSheet,
  VTextarea,
  VCheckbox,
});
