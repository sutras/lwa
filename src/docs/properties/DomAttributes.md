`lwa` 也可以对 DOM 元素的属性进行补间，例如 `<input>` 的 `value`。当目标属性是数值型时，可配合 `round` 选项避免动画过程中出现小数。

::: code-group

```html
<input class="block" />
```

```js
const input = document.querySelector(`.block`);

lwa(
  input,
  {
    value: 1000,
  },
  {
    autoplay: false,
    round: 1,
  },
);
```

:::
