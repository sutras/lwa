`round` 设置补间值的四舍五入精度，默认值为 `0`（不做四舍五入）。其原理为 `Math.round(value * round) / round`，即按 `1 / round` 的步长取整：

- `round: 1` — 取整到个位（步长 1）
- `round: 10` — 取整到十分位（步长 0.1）
- `round: 100` — 取整到百分位（步长 0.01）

适用于需要避免动画过程中出现浮点小数的场景，例如计数器或 DOM 属性值。

::: code-group

```js
const value = { value: 0 };

lwa(
  value,
  {
    value: 1000,
  },
  {
    autoplay: false,
    round: 100,
  }
);
```

:::
