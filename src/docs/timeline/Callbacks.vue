<template>
  <Demo :timeline="timeline" :name="name">
    <div :id="name" class="flex flex-col gap-3">
      <div class="block"></div>
      <ButtonGroup>
        <Button @click="onPlay">play</Button>
        <Button @click="onPause">pause</Button>
        <Button @click="onRestart">restart</Button>
        <Button @click="onFinish">finish</Button>
      </ButtonGroup>
    </div>
  </Demo>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import lwa from "@/lib";
import { useLwaContext } from "@/useLwaContext";
import Demo from "@/components/Demo.vue";
import Button from "@/components/Button.vue";
import ButtonGroup from "@/components/ButtonGroup.vue";

const name = "Callbacks";
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

useLwaContext(() => {
  timeline.value = lwa(
    `#${name} .block`,
    {
      translateX: 200,
    },
    {
      externalTicker: true,
      loop: Infinity,
      duration: 6000,
      autoplay: false,
      direction: "alternate",
      begin() {
        console.log("[callback] begin");
      },
      loopBegin() {
        console.log("[callback] loopBegin");
      },
      complete() {
        console.log("[callback] complete");
      },
      loopComplete() {
        console.log("[callback] loopComplete");
      },
      pause() {
        console.log("[callback] pause");
      },
      play() {
        console.log("[callback] play");
      },
      update() {
        console.log("[callback] update");
      },
    }
  );

  const timer = setInterval(() => {
    timeline.value?.tick();
  }, 600);

  return () => clearInterval(timer);
});
</script>
