<template>
  <div class="btn-group"><slot></slot></div>
</template>

<style>
.btn-group {
  display: inline-flex;

  .btn:not(:first-child) {
    margin-left: -1px;
  }
}
</style>
