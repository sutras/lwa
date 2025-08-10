<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { useCodeGroups } from "./composables/codeGroups";
import { useCopyCode } from "./composables/copyCode";

useCodeGroups();
useCopyCode();
</script>
