<template>
  <code class="flex items-center relative">
    <span>{{ print }}</span>
    <span
      class="absolute right-[-3px] w-[1px] h-4 bg-[currentColor]"
      :class="{ flash: end === text.length }"
    ></span>
  </code>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import lwa from "lwa";
import { useLwaContext } from "@/useLwaContext";

const props = defineProps<{
  text: string;
}>();

const emit = defineEmits<{
  (e: "create", timeline: ReturnType<typeof lwa>): void;
}>();

const timeline = ref<ReturnType<typeof lwa>>();

const end = ref(0);

const print = computed(() => {
  return end.value < 0 ? "" : props.text.slice(0, end.value);
});

useLwaContext(() => {
  timeline.value = lwa(
    {
      value: 0,
    },
    {
      value: 1,
    },
    {
      duration: props.text.length * 150,
      easing: "linear",
      update(_, progress) {
        end.value = Math.floor(progress * props.text.length);
      },
      autoplay: false,
    }
  );

  emit("create", timeline.value);

  return timeline.value;
});
</script>

<style scoped>
@keyframes flash {
  50% {
    opacity: 0;
  }
}
.flash {
  animation: flash 1s step-end infinite;
}
</style>
