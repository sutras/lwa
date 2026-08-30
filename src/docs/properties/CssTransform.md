`lwa` 支持将 `transform` 的各个子属性（`translateX`、`translateY`、`rotate`、`scale`、`skew` 等）作为独立的补间属性。`lwa` 会在内部维护每个元素的 transform 子属性映射，并将它们组合成一条 `transform` 字符串写入样式，因此可以同时且互不干扰地动画多个变换属性。

::: code-group

```html
<div class="block"></div>
```

```js
lwa(`.block`, {
  rotate: 360,
  scale: 2,
  translateX: 200,
});
```

:::
