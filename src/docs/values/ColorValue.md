`lwa` 支持对颜色值进行补间，包括 hex、`rgb`、`rgba`、`hsl`、`hsla` 以及命名颜色等格式。颜色会在动画过程中被解析为通道值并平滑过渡。

:::warning 命名颜色需要额外注册插件
命名颜色（`red`、`rebeccapurple` 等）由可选的 `namedColorPlugin` 提供。按需加载时需要显式注册，否则颜色名不会被识别：

```js
import { use, colorPlugin, namedColorPlugin } from "lwa";

use([colorPlugin, namedColorPlugin]);
```

hex / `rgb` / `rgba` / `hsl` / `hsla` 不需要该插件。完整版入口已默认注册。
:::

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
