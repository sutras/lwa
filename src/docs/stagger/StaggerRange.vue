<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
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

const timeline = ref();
const name = "StaggerRange";

useLwaContext(() => {
  return (timeline.value = lwa(`#${name} .block`, {
    translateX: lwa.stagger([50, 300]),
    rotate: lwa.stagger([0, 360]),
  }));
});
</script>
