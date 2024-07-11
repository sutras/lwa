<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <svg>
        <filter id="displacementFilter">
          <feTurbulence
            type="turbulence"
            baseFrequency=".05"
            numOctaves="2"
            result="turbulence"
          ></feTurbulence>
          <feDisplacementMap
            in2="turbulence"
            in="SourceGraphic"
            scale="15"
            xChannelSelector="R"
            yChannelSelector="G"
          ></feDisplacementMap>
        </filter>
        <polygon
          points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100"
          style="filter: url(#displacementFilter)"
          fill="var(--primary-color)"
        ></polygon>
      </svg>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "SvgAttributes";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa
    .timeline()
    .add(
      `#${name} polygon`,
      {
        points: "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96",
      },
      {
        duration: 1000,
        easing: "easeInOutExpo",
      }
    )
    .add(
      `#${name} feTurbulence`,
      {
        baseFrequency: 0,
      },
      {
        duration: 1000,
        easing: "easeInOutExpo",
      },
      0
    )
    .add(
      `#${name} feDisplacementMap`,
      {
        scale: 1,
      },
      {
        duration: 1000,
        easing: "easeInOutExpo",
      },
      0
    ));
});
</script>
