<template>
  <div class="fps">{{ fps }} FPS</div>
</template>

<script lang="ts" setup>
import lwa from "@/lib";
import { onMounted, onBeforeUnmount, ref } from "vue";

const fps = ref(0);

let prevTickTime = 0;
let realtimeFPS = 0;
const tick = () => {
  let currentTime = Date.now();
  realtimeFPS = Math.round(1000 / (currentTime - prevTickTime) || 0);
  prevTickTime = currentTime;
};

let timer: ReturnType<typeof setInterval>;

onMounted(() => {
  prevTickTime = Date.now();
  lwa.ticker.add(tick);

  timer = setInterval(() => {
    fps.value = realtimeFPS;
  }, 1000);
});

onBeforeUnmount(() => {
  lwa.ticker.remove(tick);

  clearInterval(timer);
});
</script>

<style scope>
.fps {
  position: fixed;
  top: 13px;
  right: 13px;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 30px;
  color: #fff;
  border-radius: var(--rounded-lg);
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
