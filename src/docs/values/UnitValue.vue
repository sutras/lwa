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

const name = "UnitValue";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: "200px",
    },
    {
      autoplay: false,
    }
  ));
});
</script>
