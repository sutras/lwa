`lwa` 接受一个 CSS 选择器字符串作为动画对象，内部会使用 `document.querySelectorAll` 查询匹配的所有元素，并将它们统一作为动画目标。

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
