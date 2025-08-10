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

const name = "ObjectProperties";
const timeline = ref();

const obj = reactive({
  prop1: "10px",
  prop2: 0,
});

useLwaContext(() => {
  return (timeline.value = lwa(
    obj,
    {
      prop1: "100px",
      prop2: 1000,
    },
    {
      autoplay: false,
      round: 1,
    }
  ));
});
</script>
