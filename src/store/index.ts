import { createPinia } from "pinia";
import { App } from "vue";

const pinia = createPinia();

export function registerStore(app: App) {
  app.use(pinia);
}
