时间轴实例提供以下控制方法：

- `play()` — 播放（从当前位置继续）
- `pause()` — 暂停
- `restart()` — 重新开始
- `finish()` — 跳到结束位置
- `seek(position)` — 跳转到指定时间（毫秒）
- `progress(p)` — 跳转到指定进度（0-1）

::: code-group

```html
<div class="block"></div>
<button onclick="play()">play</button>
<button onclick="pause()">pause</button>
<button onclick="restart()">restart</button>
<button onclick="finish()">finish</button>
<button onclick="seek()">seek 1.5s</button>
<button onclick="progress()">progress 0.5</button>
```

```js
const animation = lwa(
  `.block`,
  {
    translateX: 200,
  },
  {
    loop: Infinity,
    duration: 2000,
    autoplay: false,
    direction: "alternate",
  },
);

function play() {
  animation.play();
}

function pause() {
  animation.pause();
}

function restart() {
  animation.restart();
}

function finish() {
  animation.finish();
}

function seek() {
  animation.seek(1500);
}

function progress() {
  animation.progress(0.5);
}
```

:::
