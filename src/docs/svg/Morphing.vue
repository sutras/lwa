<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex justify-center items-center">
      <div class="relative">
        <svg width="140" height="140" viewBox="0 0 140 140">
          <g fill="none" fill-rule="evenodd">
            <g
              fill="var(--primary-color)"
              fill-opacity=".15"
              transform="translate(0 6)"
            >
              <polygon
                points="70 0 136.574 48.369 111.145 126.631 28.855 126.631 3.426 48.369"
              ></polygon>
              <polygon
                points="70 18 119.455 53.931 100.565 112.069 39.435 112.069 20.545 53.931"
              ></polygon>
              <polygon
                points="70 34.86 101.727 57.911 89.609 95.209 50.391 95.209 38.273 57.911"
              ></polygon>
              <polygon
                points="70 50.898 84.864 61.697 79.186 79.171 60.814 79.171 55.136 61.697"
              ></polygon>
            </g>
            <polygon
              class="polymorph"
              stroke-width="1"
              stroke="var(--primary-color)"
              points="70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369"
            ></polygon>
          </g>
        </svg>
      </div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const timeline = ref<ReturnType<typeof lwa>>();
const name = "Morphing";

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .polymorph`,
    {
      points: [
        "70 41 118.574 59.369 111.145 132.631 60.855 84.631 20.426 60.369",
        "70 6 119.574 60.369 100.145 117.631 39.855 117.631 55.426 68.369",
        "70 57 136.574 54.369 89.145 100.631 28.855 132.631 38.426 64.369",
        "70 24 119.574 60.369 100.145 117.631 50.855 101.631 3.426 54.369",
      ],
    },
    {
      duration: 1500,
      round: 10,
      loop: Infinity,
      direction: "alternate",
    }
  ));
});
</script>
