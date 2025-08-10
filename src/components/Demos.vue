<template>
  <div ref="demosRef" class="demos">
    <div v-for="(demoGroup, i) in demoGroups" :key="i">
      <div class="demos-title">{{ demoGroup.title }}</div>
      <component v-for="demo in demoGroup.children" :is="demo" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useAppStore } from "@/store/modules/app";
import { useRouter } from "vue-router";

const modules = import.meta.glob("@/docs/**/*.vue", {
  eager: true,
  import: "default",
});

const mapModules: Record<string, unknown> = {};
Object.keys(modules).forEach((key) => {
  mapModules[key.replace(/.*\//, "").replace(/\..+$/, "")] = modules[key];
});

const router = useRouter();

const demoGroups = computed(() => {
  return router.options.routes[0].children?.map((route) => {
    return {
      title: route.meta?.title,
      children: route.children?.map((route) => {
        return mapModules[route.name as string];
      }),
    };
  });
});

const demosRef = ref();
const appStore = useAppStore();

watch(demosRef, () => {
  appStore.demoScrollBox = demosRef.value;
});
</script>

<style scoped>
.demos {
  flex: 1;
  overflow-x: hidden;
  overflow-y: scroll;
}
.demos-title {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  height: var(--nav-height);
  padding: 0 1rem;
  font-size: var(--lw-text-lg);
  font-weight: bold;
  color: var(--lw-primary);
  text-align: left;
  border-bottom: 1px solid var(--lw-border-color);
  background-color: var(--lw-body-bg);
}
</style>
