`lwa` 支持通过 `+=`、`-=`、`*=`、`/=`、`%=` 等运算符表示相对值。相对值会基于元素当前属性的实际值计算目标值，例如从当前 `translateX` 再加 100px，或将当前宽度变为 3 倍。

::: code-group

```html
<div class="block" style="transform: translateX(50px) translateY(50px)"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: "+=100px",
    translateY: "-=50px",
    width: "*=3",
    height: "/=2",
  },
  {
    autoplay: false,
  },
);
```

:::
