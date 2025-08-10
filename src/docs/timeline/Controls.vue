<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-3">
      <div class="block"></div>
      <ButtonGroup>
        <Button @click="onPlay">play</Button>
        <Button @click="onPause">pause</Button>
        <Button @click="onRestart">restart</Button>
        <Button @click="onFinish">finish</Button>
        <Button @click="onSeek">seek 1.5s</Button>
        <Button @click="onProgress">progress 0.5</Button>
      </ButtonGroup>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";
import Button from "@/components/Button.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";

const name = "Controls";
const timeline = ref<ReturnType<typeof lwa>>();

const onPlay = () => {
  timeline.value?.play();
};

const onPause = () => {
  timeline.value?.pause();
};

const onRestart = () => {
  timeline.value?.restart();
};

const onFinish = () => {
  timeline.value?.finish();
};

const onSeek = () => {
  timeline.value?.seek(1500);
};

const onProgress = () => {
  timeline.value?.progress(0.5);
};

useLwaContext(() => {
  return (timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: 200,
    },
    {
      loop: Infinity,
      duration: 2000,
      autoplay: false,
      direction: "alternate",
    }
  ));
});
</script>
