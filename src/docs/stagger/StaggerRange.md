`lwa.stagger(value)` 的 `value` 也可以传入一个 `[min, max]` 数组，将值分布在该区间内作为属性值（而非延迟间隔）。这适用于为每个元素分配属性值，例如平铺 `translateX` 或 `rotate`。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
```

```js
lwa(`.block`, {
  translateX: lwa.stagger([50, 300]),
  rotate: lwa.stagger([0, 360]),
});
```

:::
