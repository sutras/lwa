属性值和补间选项都可以是函数，签名均为 `(target, index, total) => value`。这样每个动画目标都可以根据自身的索引、总数或目标对象计算不同的值。

::: code-group

```html
<div class="relative flex flex-col gap-1">
  <div class="absolute block small"></div>
  <div class="absolute block small"></div>
  <div class="absolute block small"></div>
  <div class="absolute block small"></div>
</div>
```

```js
lwa(
  `.block`,
  {
    translateX: (_, index) => 100 * (index + 1),
    translateY: (_, index, total) => -80 * (1 - index / total),
    rotate: () => lwa.random(0, 360),
  },
  {
    autoplay: false,
    duration: (_, index) => 500 + index * 100,
  },
);
```

:::
