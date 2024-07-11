<template>
  <Demo :timeline="timeline" :name="name">
    <input
      ref="input"
      type="text"
      class="block"
      style="width: 100px; border: none; text-align: center"
    />
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "DomAttributes";
const timeline = ref();

const input = ref();

useLwaContext(() => {
  return (timeline.value = lwa(
    input.value,
    {
      value: 1000,
    },
    {
      autoplay: false,
      round: 1,
    }
  ));
});
</script>
