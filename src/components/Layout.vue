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
          <svg viewBox="0 0 16 16" width="1em" height="1em">
            <path
              fill="currentColor"
              d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
            />
          </svg>
          <span>Github</span>
        </a>
      </div>
      <div class="docs-content">
        <Timeline></Timeline>
        <div class="docs-body">
          <router-view></router-view>
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

const route = useRoute();
</script>

<style scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-color);
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
  border-right: 1px solid var(--border-color);
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
  border-bottom: 1px solid var(--border-color);
  font-size: var(--text-lg);
  font-weight: bold;
  color: var(--primary-color);

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
  display: flex;
  align-items: center;
  height: var(--nav-height);
  padding: 0 1rem;
  border-bottom: 1px solid var(--border-color);
}
.docs-title {
  color: var(--primary-color);
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
  overflow-x: hidden;
  overflow-y: auto;
}
.docs-body {
  padding: 1rem;
}
</style>
