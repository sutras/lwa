<template>
  <div class="menu-wrapper">
    <div class="menu" ref="menuRef">
      <div v-for="item in menus" :key="item.title" class="menu-group">
        <div class="menu-group-title">{{ item.title }}</div>
        <div
          v-for="subItem in item.children"
          :key="item.title"
          :data-name="subItem.name"
          class="menu-item"
          :class="{ active: route.name === subItem.name }"
          @click="onClick(subItem.name)"
        >
          {{ subItem.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const menus = computed(() => {
  return router.options.routes[0].children?.map((route) => {
    return {
      title: route.name,
      children: route.children?.map((route) => {
        return {
          title: route.meta?.title,
          name: route.name as string,
        };
      }),
    };
  });
});

const onClick = (name: string) => {
  router.push({
    name: name,
  });
};

const menuRef = ref<HTMLElement>();

watch(
  () => route.name,
  () => {
    nextTick(() => {
      menuRef.value
        ?.querySelector(`[data-name="${route.name as string}"]`)
        ?.scrollIntoView({
          block: "nearest",
        });
    });
  },
  {
    flush: "post",
    immediate: true,
  }
);
</script>

<style scoped>
.menu-wrapper {
  flex: 1;
  overflow: auto;
}
.menu {
  padding: 1rem;
}
.menu-group {
  margin-bottom: 1rem;
}
.menu-group-title {
  margin-bottom: 0.5rem;
  font-size: var(--text-sm);
}
.menu-item {
  padding-left: 1rem;
  cursor: pointer;
  margin-bottom: 0.25rem;
  &:hover {
    color: #eee;
  }
  &.active {
    color: var(--primary-color);
  }
}
</style>
