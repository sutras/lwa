`duration` 设置动画的持续时间，单位为毫秒，默认值为 `1000`。

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
  },
);
```

:::
