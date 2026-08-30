`autoplay` 设置动画是否自动播放，默认值为 `true`。设为 `false` 时需要手动调用 `play()` 或 `restart()` 启动动画。

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
  },
);
```

:::
