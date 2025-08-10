<template>
  <Demo :timeline="timeline" :name="name">
    {{ value }}
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "Round";
const timeline = ref();
const value = ref(0);

useLwaContext(() => {
  return (timeline.value = lwa(
    value,
    {
      value: 1000,
    },
    {
      autoplay: false,
      round: 100,
    }
  ));
});
</script>
