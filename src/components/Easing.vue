<template>
  <div class="easing-wrapper">
    <div class="easing-name">{{ name }}</div>
    <div class="easing-content" @click="onClick">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <g>
          <rect x="0" y="0" width="100" height="100" />
          <path :d="d" ref="path" />
          <circle cx="110" :cy="cy" r="5" fill="var(--lw-primary)"></circle>
        </g>
      </svg>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import { Easings } from "@/lib";

const props = defineProps<{
  name: keyof Easings;
}>();

const timeline = ref<ReturnType<typeof lwa>>();

const svgSize = 100;

const generateD = () => {
  const scales = 100;
  return (
    `M0 ${svgSize}` +
    Array(scales + 1)
      .fill(0)
      .map((_, i) => {
        const ratio = i / scales;
        const x = ratio * svgSize;
        const y = (1 - lwa.easings[props.name]()(ratio)) * svgSize;
        return `L${x.toFixed(2)} ${y.toFixed(2)}`;
      })
      .join("")
  );
};

const d = ref(generateD());

const path = ref();
const cy = ref(100);

useLwaContext(() => {
  return (timeline.value = lwa(
    path.value,
    {
      strokeDashoffset: lwa.withFrom(lwa.setDashoffset, 0),
    },
    {
      duration: 1000,
      easing: "linear",
      update(_, progress) {
        cy.value = (1 - lwa.easings[props.name]()(progress)) * 100;
      },
    }
  ));
});

const onClick = () => {
  timeline.value?.restart();
};
</script>

<style scoped>
.easing-wrapper {
  display: flex;
  flex-direction: column;
}

.easing-name {
  margin-bottom: 4px;
  font-size: var(--lw-text-sm);
  text-align: center;
}
.easing-content {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 100px;
  cursor: pointer;

  svg {
    flex: none;
    width: 80px;
    height: 80px;
    transform: scale(2);
    pointer-events: none;
  }
  g {
    transform-origin: center;
    transform: scale(0.5);
  }
  path {
    fill: none;
    stroke-width: 1;
    stroke: var(--lw-primary);
  }
  rect {
    fill: var(--lw-primary-bg-subtle);
  }
}
</style>
