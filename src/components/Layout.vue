<template>
  <div class="layout">
    <div class="header">
      <div class="brand">
        <img src="/lwa-logo.svg" />
      </div>
    </div>
    <div class="sidebar">
      <Menu></Menu>
    </div>
    <Demos></Demos>
    <div class="docs">
      <div class="docs-header">
        <div class="docs-title">
          {{ route.meta.title }}
        </div>
        <a class="github" target="_blank" href="https://github.com/sutras/lwa">
          <SvgIcon name="github" />
          <span>Github</span>
        </a>
      </div>
      <div class="docs-content">
        <Timeline></Timeline>
        <div class="docs-body">
          <router-view></router-view>
          <Pagination />
        </div>
      </div>
    </div>
  </div>
  <FPS></FPS>
</template>

<script lang="ts" setup>
import Demos from "./Demos.vue";
import FPS from "./FPS.vue";
import Menu from "./Menu.vue";
import Timeline from "@/components/timeline/Timeline.vue";
import { useRoute } from "vue-router";
import Pagination from "./Pagination.vue";
import SvgIcon from "./SvgIcon.vue";

const route = useRoute();
</script>

<style scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: var(--lw-body-bg);
  --sidebar-width: 220px;
  --nav-height: 56px;
}
.header {
  width: 100%;
}
.sidebar {
  flex: none;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  width: var(--sidebar-width);
  margin-top: var(--nav-height);
}

@media (max-width: 1100px) {
  .sidebar {
    display: none;
  }
}
@media (min-width: 800px) and (max-width: 1100px) {
  .header {
    display: none;
  }
}
@media (min-width: 800px) {
  .layout {
    flex-direction: row;
  }
  .header {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--sidebar-width);
  }
}

.brand {
  flex: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--nav-height);
  border-bottom: 1px solid var(--lw-border-color);
  font-size: var(--lw-text-lg);
  font-weight: bold;
  color: var(--lw-primary);

  img {
    height: 40px;
    width: auto;
  }
}

.docs {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  @media (max-width: 800px) {
    display: none;
  }
}
.docs-header {
  flex: none;
  display: flex;
  align-items: center;
  height: var(--nav-height);
  padding: 0 1rem;
  border-bottom: 1px solid var(--lw-border-color);
}
.docs-title {
  color: var(--lw-primary);
}
.github {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 90px;
  color: #fff;
  text-decoration: none;

  svg {
    margin-right: 0.25rem;
  }
}
.docs-content {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}
.docs-body {
  flex: 1;
  min-height: 0;
  padding: 1rem;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
