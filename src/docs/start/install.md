lwa 可以通过多种方式进行安装，具体取决于您的环境或工作流程。本节将介绍不同的安装方法。

## 通过 NPM 和打包工具进行安装

如果您使用的是像 Vite 或 esbuild 这样的打包工具，只需通过 NPM 安装该包即可。

::: code-group

```bash [npm]
npm install lwa
```

```bash [pnpm]
pnpm add lwa
```

```bash [yarn]
yarn add lwa
```

```bash [bun]
bun add lwa
```

:::

然后像这样将 lwa 的方法作为 ES6 模块进行导入：

```js
import { createAnimation } from "lwa";
```

## 通过 CDN 使用 lwa

### ES6 Modules

```html
<script type="module">
  import { createAnimation } from "https://unpkg.com/lwa/dist/lwa.full.es.js";
</script>
```

### 全局对象

```html
<script src="https://unpkg.com/lwa/dist/lwa.full.umd.js"></script>

<script>
  const { createAnimation } = lwa;
</script>
```
