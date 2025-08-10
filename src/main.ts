import { createApp } from "vue";
import App from "./App.vue";
import "./style/index.css";
import { registerStore } from "./store";
import { createBlockColorsStyle } from "./block-colors";
import { registerRouter } from "./router";

import "virtual:svg-icons-register";

createBlockColorsStyle();

const app = createApp(App);

registerStore(app);
registerRouter(app);

app.mount("#app");
