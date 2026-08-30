`lwa` 接受一个数组作为动画对象。数组中的每一项可以是 CSS 选择器字符串、DOM 元素、类数组对象或 JavaScript 对象，`lwa` 会将它们展平后去重，统一作为动画目标。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
```

```js
lwa(
  [el, `#${name} .block:nth-child(2)`, `#${name} .block:nth-child(3)`],
  {
    translateX: 200,
  },
  {
    autoplay: false,
  },
);
```

:::
