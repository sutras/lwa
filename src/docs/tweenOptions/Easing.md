`easing` 设置动画的缓动函数，默认值为 `"easeInOutQuad"`。可以传入字符串名称来使用内置缓动函数，也可以传入一个自定义函数 `(k: number) => number`。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    autoplay: false,
    duration: 1000,
    easing: "easeOutBounce",
  }
);
```

:::

内置缓动函数列表如下：

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
