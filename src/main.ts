import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { registerStore } from "./store";
import { createBlockColorsStyle } from "./block-colors";
import { registerRouter } from "./router";

createBlockColorsStyle();

const app = createApp(App);

registerStore(app);
registerRouter(app);

app.mount("#app");
