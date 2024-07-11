import { onBeforeUnmount, onMounted } from "vue";
import lwa from "@/lib";

export function useLwaContext(
  callback: () => ReturnType<typeof lwa> | undefined | void | (() => void)
) {
  let tl: ReturnType<typeof lwa> | undefined | void | (() => void);

  onMounted(() => {
    tl = callback();
  });

  onBeforeUnmount(() => {
    if (tl) {
      if (typeof tl === "function") {
        tl();
      } else {
        tl.pause();
      }
    }
  });
}
