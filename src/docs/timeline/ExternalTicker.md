`externalTicker` 设置为 `true` 时，动画不会自动跟随内部时钟更新，而是需要手动调用 `tick()` 驱动。适用于需要自定义时间源或与其他动画系统同步的场景。

::: code-group

```html
<div class="block"></div>
```

```js
const animation = lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    autoplay: false,
    duration: 1000,
    externalTicker: true,
  },
);

// 手动驱动动画
setInterval(() => {
  animation.tick();
}, 150);
```

:::
