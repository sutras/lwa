`lwa` 可以对 SVG 元素的属性进行补间，例如 `<polygon>` 的 `points`、`<feTurbulence>` 的 `baseFrequency`、`<feDisplacementMap>` 的 `scale` 等。`lwa` 在内部通过 `setAttribute` 写入属性值，因此可用于实现 SVG 变形、滤镜参数变化等效果。

下方示例使用时间轴将多边形顶点变形与置换滤镜的扰动、位移参数同步变化：

::: code-group

```html
<svg>
  <filter id="displacementFilter">
    <feTurbulence
      type="turbulence"
      baseFrequency=".05"
      numOctaves="2"
      result="turbulence"
    ></feTurbulence>
    <feDisplacementMap
      in2="turbulence"
      in="SourceGraphic"
      scale="15"
      xChannelSelector="R"
      yChannelSelector="G"
    ></feDisplacementMap>
  </filter>
  <polygon
    points="64 68.64 8.574 100 63.446 67.68 64 4 64.554 67.68 119.426 100"
    style="filter: url(#displacementFilter)"
    fill="var(--lw-primary)"
  ></polygon>
</svg>
```

```js
lwa
  .timeline()
  .add(
    `polygon`,
    {
      points: "64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96",
    },
    {
      duration: 1000,
      easing: "easeInOutExpo",
    },
  )
  .add(
    `feTurbulence`,
    {
      baseFrequency: 0,
    },
    {
      duration: 1000,
      easing: "easeInOutExpo",
    },
    0,
  )
  .add(
    `feDisplacementMap`,
    {
      scale: 1,
    },
    {
      duration: 1000,
      easing: "easeInOutExpo",
    },
    0,
  );
```

:::
