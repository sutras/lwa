`lwa` 支持对颜色值进行补间，包括 hex、`rgb`、`rgba`、`hsl`、`hsla` 以及命名颜色等格式。颜色会在动画过程中被解析为通道值并平滑过渡。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    backgroundColor: (_, i) => {
      return [
        "rebeccapurple",
        "#663399",
        "rgb(102,51,153)",
        "hsl(270deg,50%,40%)",
        "rgba(102,51,153, 0.2)",
        "hsla(270deg,50%,40%,0.2)",
      ][i];
    },
  },
  {
    autoplay: false,
  },
);
```

:::
