<template>
  <div class="timeline-wrapper">
    <div v-if="appStore.timeline" class="timeline" ref="timelineRef">
      <Scale
        :count="scaleCount"
        :duration="appStore.timeline.getDuration()"
        @change="onChange"
      ></Scale>
      <Cursor :timelineEl="timelineRef"></Cursor>
      <Layer :events="appStore.timeline.events"></Layer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAppStore } from "@/store/modules/app";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import Scale from "./Scale.vue";
import Cursor from "./Cursor.vue";
import Layer from "./Layer.vue";
import lwa from "@/lib";

const appStore = useAppStore();

const timelineRef = ref<HTMLElement>();

const scaleCount = computed(() => {
  return Math.ceil((appStore.timeline?.getDuration() || 0) / 1000) * 10;
});

const onResize = () => {
  if (timelineRef.value) {
    appStore.scaleWidth =
      parseFloat(lwa.css(timelineRef.value, "width")) / scaleCount.value;
  }
};

watch([timelineRef, () => appStore.timeline], () => {
  onResize();
});

onMounted(() => {
  onResize();
  window.addEventListener("resize", onResize);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onResize);
});

const onChange = () => {};
</script>

<style scoped>
.timeline-wrapper {
  padding: 1rem;
}
.timeline {
  position: relative;
  min-height: 100px;
  margin-left: 80px;
}
</style>
