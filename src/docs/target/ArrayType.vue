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
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "ArrayType";
const timeline = ref();

useLwaContext(() => {
  const el = document.querySelector(`#${name} .block:nth-child(1)`);
  return (timeline.value = lwa(
    [el, `#${name} .block:nth-child(2)`, `#${name} .block:nth-child(3)`],
    {
      translateX: 200,
    },
    {
      autoplay: false,
    }
  ));
});
</script>
