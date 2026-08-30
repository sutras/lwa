`direction` 选项控制 stagger 的播放顺序，可选值：

- `"normal"`（默认）— 从起始位置向两端扩散
- `"reverse"` — 从两端向起始位置收缩

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    delay: lwa.stagger(100, { direction: "reverse" }),
  },
);
```

:::
