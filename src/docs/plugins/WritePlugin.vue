<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-2">
      <div class="track">
        <div class="bar" :style="{ width: state.bar.width + '%' }"></div>
      </div>
      <span class="text">{{ Math.round(state.text.value) }}%</span>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import lwa from "lwa";
import { definePlugin } from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";

const name = "WritePlugin";
const timeline = ref<ReturnType<typeof lwa>>();

// 被动画驱动的状态。换成 Three.js 的 mesh、pinia store 等任意嵌套对象也一样
const state = reactive({ bar: { width: 0 }, text: { value: 0 } });

// 让属性名支持路径写法，例如 "bar.width"
const pathPlugin = definePlugin({
  order: 98, // 紧挨着最外层的写回插件（100）
  init(tween) {
    if (!tween.prop.includes(".")) return;

    // 起点：沿路径读当前值
    tween.from = tween.prop
      .split(".")
      .reduce((o: any, k) => o[k], tween.animatedTarget.target);
  },
  update(tween, value, terminate) {
    if (!tween.prop.includes(".")) return;

    // 沿路径写回
    const keys = tween.prop.split(".");
    const last = keys.pop() as string;
    const target = keys.reduce(
      (o: any, k) => o[k],
      tween.animatedTarget.target,
    );

    // 和内置的写回插件一样，记得补上单位
    let val: string | number = Array.isArray(value) ? value[0] : value;
    if (tween.unit) val += tween.unit;

    target[last] = val;
    return terminate; // 已自己写回，终止后续 update
  },
});

lwa.use(pathPlugin);

useLwaContext(() => {
  return (timeline.value = lwa(
    state,
    { "bar.width": 100, "text.value": 100 },
    { duration: 1500, round: 1, autoplay: false },
  ));
});
</script>

<style scoped>
.track {
  width: 200px;
  height: 8px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--lw-border-color);
}
.bar {
  width: 0;
  height: 100%;
  background-color: var(--lw-primary);
}
.text {
  font-size: 14px;
  color: var(--lw-primary);
}
</style>
