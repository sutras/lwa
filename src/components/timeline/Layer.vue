<template>
  <div class="layers">
    <div v-for="(item, i) in tweensList" :key="i" class="layer">
      <div class="tween-prop">{{ item.tweens[0].prop }}</div>
      <div :style="getOfsetStyle(item.begin)">
        <Tween
          v-for="(tween, j) in item.tweens"
          :key="j"
          :index="j"
          :tween="tween"
        ></Tween>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { type Tween as TweenType } from "@/lib/common";
import { type TimelineEvent } from "@/lib/timeline";
import Tween from "./Tween.vue";
import { computed } from "vue";
import { useAppStore } from "@/store/modules/app";

const props = defineProps<{
  events: TimelineEvent[];
}>();

const appStore = useAppStore();

const tweensList = computed(() => {
  const tweens: {
    begin: number;
    tweens: TweenType[];
  }[] = [];
  function recur(events: TimelineEvent[], parentBegin: number) {
    events.forEach((event) => {
      if (event.target.events) {
        recur(event.target.events, parentBegin + event.begin);
      } else if (event.target.tweens) {
        tweens.push({
          begin: event.begin + parentBegin,
          tweens: event.target.tweens,
        });
      }
    });
  }
  recur(props.events, 0);
  return tweens;
});

const getOfsetStyle = (begin: number) => {
  return {
    transform: `translateX(${appStore.getWidthByTime(begin)}px)`,
  };
};
</script>

<style scoped>
.layers {
  margin-top: 20px;
}
.layer {
  position: relative;
  display: flex;
  margin-bottom: 3px;
  height: calc(1rem + 4px);
  background-color: rgba(var(--primary-color-rgb), 0.15);
}

.tween-prop {
  position: absolute;
  top: 50%;
  left: -4px;
  transform: translate(-100%, -50%);
  display: flex;
  align-items: center;
  height: 1rem;
  padding: 0 3px;
  border-radius: var(--rounded-sm);
  font-size: var(--text-xs);
  line-height: 0;
  font-weight: 300;
  color: #fff;
  --bg-color: #10b981;
  background-color: var(--bg-color);

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 100%;
    transform: translateY(-50%);
    width: 0;
    height: 0;
    border-left: 4px solid var(--bg-color);
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
  }
}
</style>
