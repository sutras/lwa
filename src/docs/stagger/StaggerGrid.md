配合 `grid: [rows, columns]` 和 `from` 选项，可以在网格布局中实现按距离中心远近依次错开的动画效果。

::: code-group

```html
<div class="grid">
  <!-- 5 行 14 列的网格 -->
</div>
```

```js
lwa(
  `.block`,
  {
    scale: { value: 0.1, easing: "easeOutSine" },
  },
  {
    delay: lwa.stagger(100, {
      grid: [5, 14],
      from: "center",
    }),
  },
);
```

:::
