当属性值使用无单位数字时，`lwa` 会根据属性类型自动处理：CSS 属性会补齐默认单位（例如 `translateX: 200` 会转换为 `200px`），普通对象属性则按纯数字进行补间。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    autoplay: false,
  },
);
```

:::
