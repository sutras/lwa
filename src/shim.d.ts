declare module "*.md" {
  import type { ComponentOptions } from "vue";

  const Component: ComponentOptions;
  export default Component;
}

declare module "virtual:svg-icons-register" {}
