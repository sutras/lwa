import { TERMINATE, type Tween } from "./common";

/**
 * 插件接口。
 *
 * - `order`：执行顺序，`init` 按降序、`update` 按升序执行（洋葱模型）。
 * - `init`：把原始属性值转换为数值补间（通常是写入 `tween.between`），
 *   返回 `TERMINATE` 可终止后续插件的 `init`。
 * - `update`：把当前数值还原为要写回目标的值，
 *   返回字符串/数组会继续传给外层插件，返回 `TERMINATE` 则终止本次更新。
 */
interface Plugin<T extends object = any, U extends object = any> {
  order: number;
  init?: (
    tween: Tween<T, U>,
    terminate: typeof TERMINATE,
  ) => void | undefined | typeof TERMINATE;
  update?: (
    tween: Tween<T, U>,
    value: string | number[],
    terminate: typeof TERMINATE,
  ) => string | number[] | void | undefined | typeof TERMINATE;
}

/**
 * 定义插件的辅助函数，仅用于类型推导，运行时原样返回入参。
 */
function definePlugin<T extends object = any, U extends object = any>(
  plugin: Plugin<T, U>,
) {
  return plugin;
}

export { type Plugin, definePlugin };
