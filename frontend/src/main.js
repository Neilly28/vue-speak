import { createApp } from "vue";
import App from "./App.vue";
import router from "@/router/router";
import "./style.css";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

// import store
import store from "./store/index";

const vuetify = createVuetify({
  components,
  directives,
});

createApp(App).use(router).use(store).use(vuetify).mount("#app");
