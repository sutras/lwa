<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "TimelineAdd";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa
    .timeline({
      autoplay: false,
    })
    .add(`#${name} .block:nth-child(1)`, { translateX: 250 })
    .add(`#${name} .block:nth-child(2)`, { translateX: 250 })
    .add(`#${name} .block:nth-child(3)`, { translateX: 250 }));
});
</script>
