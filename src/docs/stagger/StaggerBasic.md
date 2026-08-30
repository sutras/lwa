`lwa.stagger(value)` 为每个动画目标生成递增的延迟时间，使一组元素依次错开播放。`value` 为相邻元素之间的间隔（毫秒），默认从 `0` 开始。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    delay: lwa.stagger(100),
  },
);
```

:::
