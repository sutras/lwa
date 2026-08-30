`lwa.geometry(path)` 可以根据 SVG 路径生成沿路径运动的特殊值。将该值赋给 `translateX`、`translateY`、`rotate` 等属性，即可让元素沿路径移动并自动朝向路径方向。

::: code-group

```html
<svg width="256" height="112">
  <path
    fill="none"
    stroke="currentColor"
    d="M8,56 C8,33.90861 25.90861,16 48,16 ..."
  />
</svg>
<div class="pencil"></div>
```

```js
const pathEl = document.querySelector(`path`);
const geom = lwa.geometry(pathEl);

lwa(
  `.pencil`,
  {
    translateX: geom("x"),
    translateY: geom("y"),
    rotate: geom("angle"),
  },
  {
    duration: 2000,
    easing: "linear",
  },
);
```

:::
