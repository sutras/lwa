<template>
  <div class="page">
    <div class="page-item">
      <div
        v-if="prevRoute"
        class="page-link page-prev"
        @click="toRoute(prevRoute.name)"
      >
        <SvgIcon name="arrow-left" />
        {{ prevRoute.title }}
      </div>
    </div>
    <div class="page-item">
      <div
        v-if="nextRoute"
        class="page-link page-next"
        @click="toRoute(nextRoute.name)"
      >
        {{ nextRoute.title }}
        <SvgIcon name="arrow-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import router from "@/router";
import { computed } from "vue";
import { useRoute } from "vue-router";
import SvgIcon from "./SvgIcon.vue";

const route = useRoute();

const routes = computed(() => {
  const children = router.options.routes[0].children || [];
  return children
    .map((route) => route.children || [])
    .flat()
    .map((route) => {
      return {
        title: route.meta?.title as string,
        name: route.name as string,
      };
    });
});

const prevRoute = computed(() => {
  const index = routes.value.findIndex((_route) => _route.name === route.name);
  return routes.value[index - 1];
});

const nextRoute = computed(() => {
  const index = routes.value.findIndex((_route) => _route.name === route.name);
  return routes.value[index + 1];
});

const toRoute = (name: string) => {
  router.push({
    name,
  });
};
</script>

<style scoped>
.page {
  display: flex;
  gap: 20px;
  margin-top: 40px;
}

.page-item {
  flex: 1;
}

.page-link {
  display: flex;
  align-items: center;
  gap: 10px;
  height: 48px;
  padding: 0 12px;
  border-radius: var(--lw-rounded-lg);
  background-color: var(--lw-primary-bg-subtle);
  cursor: pointer;
}

.page-prev {
  justify-content: flex-start;
}

.page-next {
  justify-content: flex-end;
}
</style>
