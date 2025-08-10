<template>
  <Demo :timeline="timeline" :name="name">
    {{ obj }}
  </Demo>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "JavaScriptObject";
const timeline = ref();

const obj = reactive({
  width: "10px",
  count: 0,
});

useLwaContext(() => {
  return (timeline.value = lwa(
    obj,
    {
      width: "100px",
      count: 1000,
    },
    {
      autoplay: false,
      round: 1,
    }
  ));
});
</script>
