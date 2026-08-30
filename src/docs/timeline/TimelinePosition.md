`.add()` 的第四个参数可以指定动画在时间轴上的位置。支持以下语法：

- 数字 — 绝对时间位置（毫秒）
- `">"` — 前一个动画结束（默认）
- `"<"` — 前一个动画开始（与前一个动画同时开始）
- `">+=N"` — 前一个动画结束后 N 毫秒
- `">-=N"` — 前一个动画结束前 N 毫秒
- `"<+=N"` — 前一个动画开始后 N 毫秒
- `"<-=N"` — 前一个动画开始前 N 毫秒
- `">+=N%"` — 前一个动画持续时间的 N%

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
```

```js
lwa
  .timeline({
    autoplay: false,
  })
  .add(`.block:nth-child(1)`, { translateX: 250 })
  .add(`.block:nth-child(2)`, { translateX: 250 })
  .add(`.block:nth-child(3)`, { translateX: 250 }, "<") // 与前一个同时开始
  .add(`.block:nth-child(4)`, { translateX: 250 }, ">+=500") // 前一个结束后 500ms
  .add(`.block:nth-child(5)`, { translateX: 250 }, ">-=250") // 前一个结束前 250ms
  .add(`.block:nth-child(6)`, { translateX: 250 }, "<-=500") // 前一个开始前 500ms
  .add(`.block:nth-child(7)`, { translateX: 250 }, 250) // 绝对位置 250ms
  .add(`.block:nth-child(8)`, { translateX: 250 }) // 默认：前一个结束后
  .add(`.block:nth-child(9)`, { translateX: 250 }, ">+=50%"); // 前一个持续时间的 50%
```

:::
