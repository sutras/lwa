`lwa` 接受任意 JavaScript 对象作为动画对象，直接对其属性进行补间。这适用于不涉及 DOM 的场景，例如对响应式对象或普通数据对象的数值属性进行动画。

::: code-group

```js
const obj = {
  width: "10px",
  count: 0,
};

lwa(
  obj,
  {
    width: "100px",
    count: 1000,
  },
  {
    autoplay: false,
    round: 1,
  },
);
```

:::

::: tip
`round` 选项用于对补间值进行四舍五入。当需要避免数值在动画过程中出现小数（例如计数器场景）时非常有用。
:::
