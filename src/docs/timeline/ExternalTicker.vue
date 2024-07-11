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

const name = "ExternalTicker";
const timeline = ref<ReturnType<typeof lwa>>();

useLwaContext(() => {
  timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: 200,
    },
    {
      autoplay: false,
      duration: 1000,
      externalTicker: true,
    }
  );

  const timer = setInterval(() => {
    timeline.value?.tick();
  }, 150);

  return () => clearInterval(timer);
});
</script>
