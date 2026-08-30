`direction` 设置动画的播放方向，默认值为 `"normal"`。可选值：

- `"normal"` — 正向播放
- `"reverse"` — 反向播放
- `"alternate"` — 交替播放（正向 → 反向 → 正向 ...）
- `"alternate-reverse"` — 反向交替（反向 → 正向 → 反向 ...）

通常配合 `loop` 使用。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  { translateX: 200 },
  {
    loop: Infinity,
    direction: "alternate",
    autoplay: false,
  },
);
```

:::
