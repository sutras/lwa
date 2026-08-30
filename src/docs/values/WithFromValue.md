使用 `lwa.withFrom(from, to)` 可以为某个属性显式指定起始值和结束值。这在你想覆盖默认从当前属性值开始的行为时非常有用。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: lwa.withFrom(100, 200),
  },
  {
    autoplay: false,
  },
);
```

:::
