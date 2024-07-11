<template>
  <button class="btn" @click="onClick"><slot></slot></button>
</template>

<script lang="ts" setup>
const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const onClick = (event: MouseEvent) => {
  event.stopPropagation();
  emit("click", event);
};
</script>

<style>
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 28px;
  padding: 0 0.5rem;
  font-size: var(--text-base);
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    color: #000;
    background-color: var(--primary-color);
  }
}
</style>
