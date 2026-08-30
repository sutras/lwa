`lwa` 的第二个参数（属性对象）也可以传入一个数组，即「关键帧」形式。数组中的每个元素是一组属性对象，`lwa` 会按顺序在各关键帧之间补间，将 `duration` 平均分配到每一段。

每个关键帧中的属性可以是普通值，也可以是一个对象，用于为该属性单独指定 `value`、`delay`、`endDelay` 等子选项。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  [
    {
      translateY: {
        value: -40,
        delay: 500,
        endDelay: 500,
      },
      translateX: 100,
    },
    { translateX: 250 },
    { translateY: 40 },
    { translateX: 0 },
    { translateY: 0 },
  ],
  {
    duration: 4000,
  },
);
```

:::
