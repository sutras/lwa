时间轴支持以下回调函数：

- `begin` — 时间轴首次开始
- `loopBegin` — 每次循环开始
- `complete` — 全部循环完成
- `loopComplete` — 每次循环完成
- `play` — 播放时触发
- `pause` — 暂停时触发
- `update(position, progress)` — 每帧更新

::: code-group

```html
<div class="block"></div>
```

```js
lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    loop: Infinity,
    duration: 6000,
    autoplay: false,
    direction: "alternate",
    begin() {
      console.log("begin");
    },
    loopBegin() {
      console.log("loopBegin");
    },
    complete() {
      console.log("complete");
    },
    loopComplete() {
      console.log("loopComplete");
    },
    play() {
      console.log("play");
    },
    pause() {
      console.log("pause");
    },
    update(position, progress) {
      console.log("update", position, progress);
    },
  },
);
```

:::
