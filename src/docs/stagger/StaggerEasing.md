`easing` 选项为 stagger 的间隔值添加缓动效果，使元素之间的间隔不是均匀的，而是按缓动曲线变化。默认值为 `"linear"`。

::: code-group

```html
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
<div class="block"></div>
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
    translateX: 200,
  },
  {
    delay: lwa.stagger(100, { easing: "easeInCubic" }),
  },
);
```

:::
