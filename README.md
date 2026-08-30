# lwa

> 轻量级的动画库，支持按需加载与摇树优化。

- 🧩 按需加载，摇树优化
- 🎬 支持 CSS 属性、Transform、颜色、相对值、函数值、关键帧等多种值类型
- ⏱ 内置时间轴（Timeline），支持交错（Stagger）动画
- 📐 支持 SVG 路径描边、形状变形与运动路径
- 🗜 体积小巧，UMD / ESM / CJS 多种格式

## 文档与演示

在线文档与演示：[https://lwa.wzt.zone/](https://lwa.wzt.zone/)

## 安装

```bash
npm install lwa
```

也支持 `pnpm`、`yarn` 或 `bun` 安装。

## 按需加载（推荐）

`lwa` 提供了模块化的入口，仅包含核心逻辑，可按需注册插件，配合打包工具的摇树优化减小体积。

```js
import {
  use,
  cssPlugin,
  colorPlugin,
  relativePlugin,
  svgPlugin,
  interpPlugin,
  createAnimation,
} from "lwa";

// 注册所需插件
use([cssPlugin, colorPlugin, relativePlugin, svgPlugin, interpPlugin]);

createAnimation("#el", {
  translateX: 200,
});
```

## 完整版 / CDN

`lwa` 的完整版内置并自动注册了全部插件，可通过默认导出直接调用，适合无需打包的 CDN 场景。

### global (UMD)

```html
<script src="https://unpkg.com/lwa/dist/lwa.full.umd.js"></script>

<script>
  lwa("#el", {
    translateX: 200,
  });
</script>
```

### ES Modules

```js
import lwa from "https://unpkg.com/lwa/dist/lwa.full.es.js";

lwa("#el", {
  translateX: 200,
});
```

完整版同样可以通过 `lwa.createAnimation`、`lwa.timeline`、`lwa.stagger` 等方式调用。

## 基础用法

```js
import lwa from "lwa";

// 创建单个动画
const animation = lwa("#el", {
  translateX: 200,
  rotate: 360,
});

// 时间轴
lwa
  .timeline()
  .add("#el1", { translateX: 200 })
  .add("#el2", { translateX: 200 }, "<");
```

## 维护

### 下载

```bash
git clone https://github.com/sutras/lwa.git
```

### 安装依赖

```bash
pnpm install
```

### 启动开发环境（文档）

```bash
npm run dev
```

### 构建文档

```bash
npm run build:docs
```

### 打包案例文档并部署

```bash
npm run buildDocsAndDeploy
```

### 打包库

```bash
npm run build:lib
```

## License

[MIT](./LICENSE)
