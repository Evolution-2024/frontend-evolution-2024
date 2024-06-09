import { createApp } from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import router from "./router";
import axiosPlugin from "./plugins/axios";
import VueApexCharts from "vue3-apexcharts";

loadFonts();

const app = createApp(App);

app.use(router);
app.use(VueApexCharts);
app.use(vuetify);
app.use(axiosPlugin);

// Mock function to check if the user is authenticated
function isAuthenticated() {
  // Aquí deberías verificar si el usuario está autenticado
  // Por ejemplo, comprobando un token en el localStorage o Vuex
  return !!localStorage.getItem("authToken");
}

// Guard de navegación global
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({
        path: "/",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.path === "/" && isAuthenticated()) {
    next({ path: "/home" });
  } else {
    next();
  }
});

app.mount("#app");
