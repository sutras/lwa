<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <div class="block round"></div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "KeyframesValue";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: [
        { value: 250, duration: 1000, delay: 500 },
        { value: 0, duration: 1000, delay: 500 },
      ],
      translateY: [
        { value: -40, duration: 500 },
        { value: 40, duration: 500, delay: 1000 },
        { value: 0, duration: 500, delay: 1000 },
      ],
      scaleX: [
        { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
        { value: 1, duration: 900 },
        { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
        { value: 1, duration: 900 },
      ],
      scaleY: [
        { value: lwa.withFrom(1.75, 1), duration: 500 },
        { value: 2, duration: 50, delay: 1000, easing: "easeOutExpo" },
        { value: 1, duration: 450 },
        { value: 1.75, duration: 50, delay: 1000, easing: "easeOutExpo" },
        { value: 1, duration: 450 },
      ],
    },
    {
      easing: "easeOutExpo",
      autoplay: false,
    }
  ));
});
</script>
