<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
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
const name = "CssTransform";

useLwaContext(() => {
  return (timeline.value = lwa(`#${name} .block`, {
    rotate: 360,
    scale: 2,
    translateX: 200,
  }));
});
</script>
