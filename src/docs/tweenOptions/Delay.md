`delay` 设置动画开始前的等待时间，单位为毫秒，默认值为 `0`。在延迟期间动画不会改变目标属性值。

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
    delay: 500,
  },
);
```

:::
