当属性值使用带单位的字符串时，`lwa` 会解析其中的数值部分，在动画过程中保留单位不变，并在起始值和结束值之间进行补间。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: "200px",
  },
  {
    autoplay: false,
  },
);
```

:::
