`lwa` 接受任何类数组对象作为动画对象，例如 `document.querySelectorAll` 返回的 `NodeList`、`HTMLCollection` 或 jQuery 对象。`lwa` 会将其中的每个元素都作为动画目标。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
```

```js
lwa(
  document.querySelectorAll(`.block`),
  {
    translateX: 200,
  },
  {
    autoplay: false,
  },
);
```

:::
