lwa 提供了以下导入方式：

## ES Modules

若要使用 ES 模块语法导入 lwa，您可以使用如下所示的 import 语句：

```js
import {
  createAnimation,
  createTimeline,
  ticker,
  stagger,
  // ...others
} from "lwa";
```

## 全局对象

您可以通过使用如下脚本标签来全局定义 lwa:

```html
<script src="https://unpkg.com/lwa/dist/lwa.full.umd.js"></script>
```

然后可以直接通过 lwa 对象访问所有模块：

```js
lwa.createAnimation();
lwa.createTimeline();
lwa.ticker;
lwa.stagger();
// ...others
```

为了简化全局对象访问的操作，lwa 提供了以下方法的别名：

```js
lwa.createAnimation(); // 等同于 lwa()
lwa.createTimeline(); // 等同于 lwa.timeline()
```
