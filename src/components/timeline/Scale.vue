<template>
  <div class="scale-wrapper">
    <div
      v-for="item in scales"
      :key="item.num"
      class="scale"
      :class="{ second: item.second }"
    >
      <span v-if="item.second" class="scale-num">{{ item.num / 10 }}s</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  count: number;
}>();

const scales = computed(() => {
  return Array(props.count + 1)
    .fill(0)
    .map((_, i) => {
      return {
        num: i,
        second: i % 10 === 0,
      };
    });
});
</script>

<style scoped>
.scale-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.scale {
  position: relative;
  width: 1px;
  height: 6px;
  background-color: #fff;

  &.second {
    height: 12px;
  }
}
.scale-num {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  color: #fff;
  user-select: none;
  font-size: var(--text-sm);
}
</style>
