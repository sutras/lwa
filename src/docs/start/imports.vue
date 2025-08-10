<template>
  <Demo :timeline="timeline" :name="name">
    <div class="flex justify-start items-center">
      <Typer
        text="import { createAnimation } from 'lwa'"
        @create="timeline = $event"
      />
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import Demo from "@/components/Demo.vue";
import Typer from "@/components/Typer.vue";

const timeline = ref<ReturnType<typeof lwa>>();
const name = "imports";
</script>
