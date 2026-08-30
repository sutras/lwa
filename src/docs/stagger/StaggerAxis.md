在网格布局中，`axis` 选项可以限制 stagger 仅沿 `"x"`（水平）或 `"y"`（垂直）方向计算距离，适用于需要按行或按列依次错开的场景。

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
    translateX: lwa.stagger(10, {
      grid: [5, 14],
      from: "center",
      axis: "x",
    }),
    translateY: lwa.stagger(10, {
      grid: [5, 14],
      from: "center",
      axis: "y",
    }),
    rotateZ: lwa.stagger([0, 90], {
      grid: [5, 14],
      from: "center",
      axis: "x",
    }),
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
