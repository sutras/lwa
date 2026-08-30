`from` 选项指定 stagger 的起始位置，支持以下值：

- `"first"`（默认）— 从第一个元素开始
- `"center"` — 从中间元素开始
- `"last"` — 从最后一个元素开始
- 数字 — 自定义索引

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
    delay: lwa.stagger(100, { from: "center" }),
  },
);
```

:::
