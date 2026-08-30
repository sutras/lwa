通过 `start` 选项可以设置 staggered 的起始偏移值，默认值为 `0`。

::: code-group

```html
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
    delay: lwa.stagger(100, { start: 100 }),
  },
);
```

:::
