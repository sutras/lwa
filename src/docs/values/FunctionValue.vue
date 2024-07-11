<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="relative flex flex-col gap-1">
      <div class="absolute block small"></div>
      <div class="absolute block small"></div>
      <div class="absolute block small"></div>
      <div class="absolute block small"></div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "FunctionValue";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: (_, index) => 100 * (index + 1),
      translateY: (_, index, total) => -80 * (1 - index / total),
      rotate: () => lwa.random(0, 360),
    },
    {
      autoplay: false,
      duration: (_, index) => 500 + index * 100,
    }
  ));
});
</script>
