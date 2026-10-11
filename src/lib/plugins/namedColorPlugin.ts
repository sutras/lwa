import { definePlugin } from "../definePlugin";
import { namedColors } from "../namedColors";
import { setNamedColors } from "./colorPlugin";

/**
 * CSS 颜色名支持（可选插件）。
 *
 * 注册后 `colorPlugin` 才能识别 `red`、`rebeccapurple` 等颜色名；
 * 不注册时颜色名会被当作无效值，体积上可省下 `namedColors` 这张表。
 * 完整版入口（`lwa.full`）已默认注册。
 */
export default definePlugin({
  order: 81,
  init() {
    setNamedColors(namedColors);
  },
});
