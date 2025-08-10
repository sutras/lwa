<template>
  <svg aria-hidden="true" class="icon">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

defineOptions({
  name: "SvgIcon",
});

const props = defineProps<{
  name: string;
}>();

const symbolId = computed(() => `#icon-${props.name}`);
</script>

<style>
.icon {
  display: inline-flex;
  width: 1em;
  height: 1em;
  fill: currentcolor;
}
</style>
