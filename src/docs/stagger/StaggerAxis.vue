<template>
  <Demo :timeline="timeline" :name="name">
    <div class="flex justify-center items-center" style="margin: 30px 0">
      <div :id="name" class="flex flex-col gap-1">
        <div v-for="i in rows" :key="i" class="flex gap-1">
          <div v-for="j in columns" :key="j" class="block"></div>
        </div>
      </div>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const timeline = ref();
const name = "StaggerAxis";

const rows = 5;
const columns = 14;

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: lwa.stagger(10, {
        grid: [rows, columns],
        from: "center",
        axis: "x",
      }),
      translateY: lwa.stagger(10, {
        grid: [rows, columns],
        from: "center",
        axis: "y",
      }),
      rotateZ: lwa.stagger([0, 90], {
        grid: [rows, columns],
        from: "center",
        axis: "x",
      }),
    },
    {
      delay: lwa.stagger(100, {
        grid: [rows, columns],
        from: "center",
      }),
    }
  ));
});
</script>
