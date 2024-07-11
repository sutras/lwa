<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-1">
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
      <div class="block"></div>
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

const name = "TimelinePosition";
const timeline = ref();

useLwaContext(() => {
  return (timeline.value = lwa
    .timeline({
      autoplay: false,
    })
    .add(`#${name} .block:nth-child(1)`, { translateX: 250 })
    .add(`#${name} .block:nth-child(2)`, { translateX: 250 })
    .add(`#${name} .block:nth-child(3)`, { translateX: 250 }, "<")
    .add(`#${name} .block:nth-child(4)`, { translateX: 250 }, ">+=500")
    .add(`#${name} .block:nth-child(5)`, { translateX: 250 }, ">-=250")
    .add(`#${name} .block:nth-child(6)`, { translateX: 250 }, "<-=500")
    .add(`#${name} .block:nth-child(7)`, { translateX: 250 }, 250)
    .add(`#${name} .block:nth-child(8)`, { translateX: 250 })
    .add(`#${name} .block:nth-child(9)`, { translateX: 250 }, ">+=50%"));
});
</script>
