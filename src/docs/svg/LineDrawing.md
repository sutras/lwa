`lwa` 提供了 `lwa.setDashoffset` 工具函数，用于实现 SVG 线条绘制效果。它的原理是将 `stroke-dasharray` 设为路径总长度，然后对 `strokeDashoffset` 从总长度补间到 `0`。

::: code-group

```html
<svg>
  <path d="M10,10 L100,10" fill="none" stroke="currentColor" />
</svg>
```

```js
lwa(
  `path`,
  {
    strokeDashoffset: lwa.withFrom(lwa.setDashoffset, 0),
  },
  {
    duration: 800,
    delay: (_, i) => i * 200,
    easing: "linear",
  },
);
```

:::
