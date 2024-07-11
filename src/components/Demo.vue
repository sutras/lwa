<template>
  <div class="demo" :class="{ active }" ref="demoRef" @click="onClick">
    <div class="demo-title">{{ title }}</div>
    <div class="demo-content">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import lwa from "@/lib";
import { useAppStore } from "@/store/modules/app";
import { computed, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps<{
  timeline?: ReturnType<typeof lwa>;
  name: string;
}>();

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

const active = computed(() => props.name === route.name);

const demoRef = ref<HTMLElement>();

const title = computed(() => {
  return router.getRoutes().find((route) => route.name === props.name)?.meta
    .title;
});

const scrollToTop = () => {
  if (demoRef.value) {
    const rect = demoRef.value.getBoundingClientRect();
    appStore.demoScrollBox?.scrollBy({
      top: rect.top - 56,
      behavior: "smooth",
    });
  }
};

watch(
  () => props.timeline,
  () => {
    if (props.timeline) {
      props.timeline.on("update", (position) => {
        if (active.value) {
          appStore.position = position;
        }
      });
    }
  }
);

watch(
  () => route.name,
  () => {
    if (active.value) {
      nextTick(() => {
        scrollToTop();
      });
    }
  },
  {
    immediate: true,
  }
);

watch(
  [() => props.timeline, () => route.name],
  () => {
    if (active.value) {
      appStore.timeline = props.timeline;
      props.timeline?.restart();
    }
  },
  {
    immediate: true,
    flush: "post",
  }
);

watch(active, () => {
  if (!active.value) {
    props.timeline?.pause();
  }
});

const onClick = (event: MouseEvent) => {
  props.timeline?.restart();
  router.push({ name: props.name });
  scrollToTop();

  emit("click", event);
};
</script>

<style scoped>
.demo {
  overflow-x: scroll;
  cursor: pointer;

  &.active {
    background-color: var(--active-bg-color);
  }
}
.demo-title {
  display: flex;
  align-items: center;
  height: var(--nav-height);
  padding: 0 1rem;
  font-size: var(--text-lg);
  text-align: left;
}
.demo-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  min-height: 160px;
  overflow-x: auto;
  text-align: center;
}
</style>
