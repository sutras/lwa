<template>
  <div class="cursor" :style="cursorStyle" ref="cursor">
    <div class="cursor-head"></div>
    <div class="cursor-line"></div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps<{
  timelineEl?: HTMLElement;
}>();

const appStore = useAppStore();

const cursorStyle = computed(() => {
  return {
    transform: `translateX(${
      (appStore.position / 100) * appStore.scaleWidth
    }px)`,
  };
});

const cursor = ref<HTMLElement>();

let isDown = false;
let downX = 0;
let downRect = { left: 0 };
let realWidth = 0;

void downX;

const onDown = (event: MouseEvent) => {
  event.preventDefault();
  isDown = true;
  downX = event.clientX;
  if (props.timelineEl) {
    downRect = props.timelineEl.getBoundingClientRect();
  }
  if (appStore.timeline) {
    realWidth = (appStore.timeline.getDuration() / 100) * appStore.scaleWidth;
  }
};

const onMove = (event: MouseEvent) => {
  if (!isDown) {
    return;
  }
  event.preventDefault();
  const progress = (event.clientX - downRect.left) / realWidth;
  if (appStore.timeline) {
    appStore.timeline.progress(
      appStore.timeline.isReverse() ? 1 - progress : progress
    );
  }
};

const onUp = () => {
  isDown = false;
};

onMounted(() => {
  cursor.value?.addEventListener("mousedown", onDown);
  document.addEventListener("mousemove", onMove);
  document.addEventListener("mouseup", onUp);
});

onBeforeUnmount(() => {
  cursor.value?.removeEventListener("mousedown", onDown);
  document.removeEventListener("mousemove", onMove);
  document.removeEventListener("mouseup", onUp);
});
</script>

<style scoped>
.cursor {
  position: absolute;
  top: 0;
  left: -3px;
  height: 100%;
  cursor: grab;
}
.cursor-head {
  width: 7px;
  height: 30px;
  background-color: rgba(var(--lw-primary-rgb), 0.2);
  border: 1px solid var(--lw-primary);
}
.cursor-line {
  position: absolute;
  top: 30px;
  bottom: -10px;
  left: 3px;
  width: 1px;
  background-color: var(--lw-primary);
}
</style>
