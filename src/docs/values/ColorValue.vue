<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "ColorValue";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      backgroundColor: (_, i) => {
        return [
          "rebeccapurple",
          "#663399",
          "rgb(102,51,153)",
          "hsl(270deg,50%,40%)",
          "rgba(102,51,153, 0.2)",
          "hsla(270deg,50%,40%,0.2)",
        ][i];
      },
    },
    {
      autoplay: false,
    }
  ));
});
</script>
