`loop` 设置动画的循环次数，默认值为 `1`。设为 `Infinity` 可无限循环。

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
    loop: Infinity,
  },
);
```

:::
