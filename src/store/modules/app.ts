import lwa from "@/lib";
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    title: "",
    currentDemoId: "",
    timeline: undefined as ReturnType<typeof lwa> | undefined,
    scaleWidth: 0,
    position: 0,
    demoScrollBox: undefined as HTMLElement | undefined,
  }),
  actions: {
    getWidthByTime(time: number) {
      return (time / 100) * this.scaleWidth;
    },
  },
});
