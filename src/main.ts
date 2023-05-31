import "./css/app.scss";
import App from "./App.vue";
import i18n from "./boot/i18n";
import { createApp } from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import routes from "./router/routes";

import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const app = createApp(App);
const pinia = createPinia();
app
  .use(i18n)
  .use(pinia)
  .use(routes)
  .use(Quasar, {
    config: {
      brand: {
        primary: "#99DF9C",
        secondary: "#26A69A",
        accent: "#4A4F5A80",
        dark: "#231f2d",
        "dark-page": "#24212c",
        positive: "#21BA45",
        negative: "#C10015",
        info: "#31CCEC",
        warning: "#F2C037",
      },
    },
    plugins: {},
  })
  .mount("#app");
