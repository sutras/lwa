<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <div
        class="block"
        style="transform: translateX(50px) translateY(50px)"
      ></div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "RelativeValue";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: "+=100px",
      translateY: "-=50px",
      width: "*=3",
      height: "/=2",
    },
    {
      autoplay: false,
    }
  ));
});
</script>
