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
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const timeline = ref();
const name = "StaggerDirection";

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: 200,
    },
    {
      delay: lwa.stagger(100, { direction: "reverse" }),
    }
  ));
});
</script>
