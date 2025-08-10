# lwa

轻量级的动画库。

- 按需加载
- 摇树优化

## 文档与演示

[https://sutras.github.io/lwa-docs](https://sutras.github.io/lwa-docs)

## 安装

```bash
npm install lwa
```

## 注册插件

```js
import {
  use,
  cssPlugin,
  colorPlugin,
  relativePlugin,
  svgPlugin,
  interpPlugin,
} from "lwa";

use([cssPlugin, colorPlugin, relativePlugin, svgPlugin, interpPlugin]);
```

## 使用

```js
import lwa from "lwa";

createAnimation("#el", {
  translateX: 200,
});
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

### 启动开发环境

```bash
npm run dev
```

### 打包案例文档和部署

```bash
npm run buildDocsAndDeploy
```

### 打包库

```bash
npm run build:lib
```
