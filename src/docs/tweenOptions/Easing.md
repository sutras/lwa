<div class="easings">
  <Easing v-for="name in easingNames" :key="name" :name="name" />
</div>

<script setup>
  import Easing from '@/components/Easing.vue'
  const easingNames = ['linear', 'easeInQuad', 'easeOutQuad', 'easeInOutQuad', 'easeInCubic', 'easeOutCubic', 'easeInOutCubic', 'easeInQuart', 'easeOutQuart', 'easeInOutQuart', 'easeInQuint', 'easeOutQuint', 'easeInOutQuint', 'easeInExpo', 'easeOutExpo', 'easeInOutExpo', 'easeInSine', 'easeOutSine', 'easeInOutSine', 'easeInCirc', 'easeOutCirc', 'easeInOutCirc', 'easeInElastic', 'easeOutElastic', 'easeInOutElastic', 'easeInBack', 'easeOutBack', 'easeInOutBack', 'easeInBounce', 'easeOutBounce', 'easeInOutBounce']
</script>

<style scoped>
  .easings {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 32px;
  }
</style>
