当动画对象是普通 JavaScript 对象（而非 DOM 元素）时，`lwa` 会直接对其自身的属性进行补间。这适用于对响应式对象或任意数据对象的数值/带单位字符串属性做动画。

::: code-group

```js
const obj = {
  prop1: "10px",
  prop2: 0,
};

lwa(
  obj,
  {
    prop1: "100px",
    prop2: 1000,
  },
  {
    autoplay: false,
    round: 1,
  },
);
```

:::
