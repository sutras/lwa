`lwa` 可以直接对任意 CSS 属性进行补间，例如 `width`、`left`、`opacity` 等。属性值可以是带单位的字符串（如 `"200px"`），也可以是无单位的数字（会自动补上默认单位）。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(`.block`, {
  width: "200px",
  left: "100px",
});
```

:::
