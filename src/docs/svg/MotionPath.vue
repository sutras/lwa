<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex justify-center items-center">
      <div class="relative">
        <svg width="256" height="112" viewBox="0 0 256 112">
          <path
            fill="none"
            stroke="var(--lw-primary)"
            stroke-width="1"
            d="M8,56 C8,33.90861 25.90861,16 48,16 C70.09139,16 88,33.90861 88,56 C88,78.09139 105.90861,92 128,92 C150.09139,92 160,72 160,56 C160,40 148,24 128,24 C108,24 96,40 96,56 C96,72 105.90861,92 128,92 C154,93 168,78 168,56 C168,33.90861 185.90861,16 208,16 C230.09139,16 248,33.90861 248,56 C248,78.09139 230.09139,96 208,96 L48,96 C25.90861,96 8,78.09139 8,56 Z"
          />
        </svg>
        <div class="pencil"></div>
      </div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const timeline = ref<ReturnType<typeof lwa>>();
const name = "MotionPath";

useLwaContext(() => {
  const pathEl = document.querySelector(`#${name} path`);
  const geom = lwa.geometry(pathEl as SVGGeometryElement);

  return (timeline.value = lwa(
    `#${name} .pencil`,
    {
      translateX: geom("x"),
      translateY: geom("y"),
      rotate: geom("angle"),
    },
    {
      duration: 2000,
      easing: "linear",
    }
  ));
});
</script>

<style scoped>
.pencil {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  background-color: var(--lw-primary);
}
</style>
