import "./css/app.scss";
import App from "./App.vue";
import i18n from "./boot/i18n";
import { createApp } from "vue";
import { Quasar } from "quasar";
import { createPinia } from "pinia";
import routes from "./router/routes";
import * as Sentry from "@sentry/vue";

import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";

const app = createApp(App);
const pinia = createPinia();

Sentry.init({
  dsn: "https://1446048d7279cb2e26f1030d7b4610ae@o4506449796202496.ingest.sentry.io/4506449797775360",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
    }),
    new Sentry.Replay({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});
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
