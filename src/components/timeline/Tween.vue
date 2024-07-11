<template>
  <div class="tween" :style="getTweenStyle(tween)">
    <div class="tween-wrapper">
      <div
        v-if="tween.delay !== 0"
        class="tween-delay"
        :style="getWidthStyle(tween.delay)"
      ></div>
      <div class="tween-duration" :style="getWidthStyle(tween.duration)"></div>
      <div
        v-if="tween.endDelay !== 0"
        class="tween-end-delay"
        :style="getWidthStyle(tween.endDelay)"
      ></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import lwa from "@/lib";
import { type Tween } from "@/lib/common";
import { useAppStore } from "@/store/modules/app";

defineProps<{
  tween: Tween;
  index: number;
}>();

const appStore = useAppStore();

const getTweenStyle = (tween: Tween) => {
  const target = tween.animatedTarget.target;
  return {
    transform: `translateX(${appStore.getWidthByTime(tween.begin)}px)`,
    color:
      target instanceof HTMLElement
        ? lwa.css(target, "backgroundColor")
        : "var(--primary-color)",
  };
};
const getWidthStyle = (time: number) => {
  return {
    width: `${appStore.getWidthByTime(time)}px`,
  };
};
</script>

<style scoped>
.tween {
  position: absolute;
  top: 2px;
  left: 0;
  display: inline-flex;
  height: 1rem;
}
.tween-wrapper {
  display: inline-flex;
  border-radius: 9999px;
}
.tween-delay,
.tween-end-delay {
  border: 1px dashed currentColor;
}
.tween-delay {
  &:first-child {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
}
.tween-end-delay {
  &:last-child {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }
}
.tween-duration {
  &:first-child {
    border-top-left-radius: inherit;
    border-bottom-left-radius: inherit;
  }
  &:last-child {
    border-top-right-radius: inherit;
    border-bottom-right-radius: inherit;
  }
  background-color: currentColor;
}
</style>
