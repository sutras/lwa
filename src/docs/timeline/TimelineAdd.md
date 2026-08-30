使用 `lwa.timeline()` 创建时间轴，并通过 `.add(target, keyframes, options?)` 依次添加动画。默认情况下，每个动画会在前一个动画结束后开始（顺序播放）。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
```

```js
lwa
  .timeline({
    autoplay: false,
  })
  .add(`.block:nth-child(1)`, { translateX: 250 })
  .add(`.block:nth-child(2)`, { translateX: 250 })
  .add(`.block:nth-child(3)`, { translateX: 250 });
```

:::
