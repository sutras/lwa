<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <div class="block"></div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const timeline = ref();
const name = "AnimationKeyframes";

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    [
      {
        translateY: {
          value: -40,
          delay: 500,
          endDelay: 500,
        },
        translateX: 100,
      },
      { translateX: 250 },
      { translateY: 40 },
      { translateX: 0 },
      { translateY: 0 },
    ],
    {
      duration: 4000,
    }
  ));
});
</script>
