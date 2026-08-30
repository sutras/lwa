`endDelay` 设置动画结束后的等待时间，单位为毫秒，默认值为 `0`。它在动画的最后一帧与动画正式完成之间插入一段空白期，适用于需要让多个动画的完成时刻对齐的场景。

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
    endDelay: 500,
  },
);
```

:::
