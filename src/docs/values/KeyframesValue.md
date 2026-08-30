单个属性值也可以是一个关键帧数组，每个关键帧是一个对象，包含 `value` 以及可选的 `duration`、`delay`、`easing` 等子选项。`lwa` 会按顺序在这些关键帧之间补间，适合为不同属性分别定义复杂的动画路径。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: [
      { value: 250, duration: 1000, delay: 500 },
      { value: 0, duration: 1000, delay: 500 },
    ],
    translateY: [
      { value: -40, duration: 500 },
      { value: 40, duration: 500, delay: 1000 },
      { value: 0, duration: 500, delay: 1000 },
    ],
    scaleX: [
      { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
      { value: 1, duration: 900 },
      { value: 4, duration: 100, delay: 500, easing: "easeOutExpo" },
      { value: 1, duration: 900 },
    ],
  },
  {
    easing: "easeOutExpo",
    autoplay: false,
  },
);
```

:::
