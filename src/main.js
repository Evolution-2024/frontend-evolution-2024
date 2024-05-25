import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import router from './router'
import axiosPlugin from './plugins/axios';


loadFonts()

const app = createApp(App);

app.use(router);
app.use(vuetify);
app.use(axiosPlugin);

app.mount('#app');