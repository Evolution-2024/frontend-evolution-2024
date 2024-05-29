// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";

const myCustomTheme = {
  dark: false, // Puedes cambiar a `true` si prefieres un tema oscuro
  colors: {
    primary: "#3FC4C0", // Color primario
    secondary: "#8FE0DE", // Color secundario
    accent: "#62D9D5", // Color secundario
  },
};

export default createVuetify({
  theme: {
    defaultTheme: "myCustomTheme",
    themes: {
      myCustomTheme,
    },
  },
});
