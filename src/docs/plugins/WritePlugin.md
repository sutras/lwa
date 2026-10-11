`lwa` 的能力几乎都由插件提供：CSS 属性、颜色、相对值、SVG、字符串插值都是内置插件。当内置插件认不出的属性或值类型出现时，可以自己写一个插件接上。

## 插件是什么

插件就是一个普通对象，`definePlugin()` 只用于类型推导，运行时原样返回入参：

```ts
import { TERMINATE, type Plugin, type Tween } from "lwa";

interface Plugin<T = any, U = any> {
  /** 执行顺序 */
  order: number;
  /** 把属性值翻译成数值补间 */
  init?: (
    tween: Tween<T, U>,
    terminate: typeof TERMINATE,
  ) => void | typeof TERMINATE;
  /** 把当前数值翻译成要写回目标的值 */
  update?: (
    tween: Tween<T, U>,
    value: string | number[],
    terminate: typeof TERMINATE,
  ) => string | number[] | void | typeof TERMINATE;
}
```

`use(plugin)` 注册插件，注册后对**之后创建的所有动画**生效。

## 洋葱模型与 order

`use()` 会把插件按 `order` **降序**排列，两个阶段的执行方向正好相反：

```
【洋葱模型】
- 0 不处理、1 处理并可流到下一环、2 处理并终止流动
- init: 把值转换为 数字数组 between
╭--------------- 100 update ---------------╮
| ╭-------------- 90 css ----------------╮ |
| | ╭------------ 80 color -------------╮ | |
| | | ╭---------- 70 relative ---------╮ | | |
| | | | ╭-------- 60 svg -------------╮ | | | |
| | | | | ╭------ 50 interp ---------╮ | | | | |
| | | | | | ╭---- 0 init ---------╮ | | | | | |
0 1 2 1 1 1 2                0 1 1 0 1 2 2
```

| 阶段     | 方向                         | 做什么                                               |
| -------- | ---------------------------- | ---------------------------------------------------- |
| `init`   | order **高 → 低**（90 → 0）  | 判断「这个属性我认不认识」，认识就把值翻译成**数字** |
| `update` | order **低 → 高**（0 → 100） | 把数字翻译回**要写回目标的值**（字符串 / 数字数组）  |

内置插件的 order：

| order | 插件               | 职责                                                 |
| ----- | ------------------ | ---------------------------------------------------- |
| 100   | `updatePlugin`     | 最外层，把值写到目标对象上（`target[prop] = value`） |
| 90    | `cssPlugin`        | CSS 属性 / `transform` / DOM 属性                    |
| 81    | `namedColorPlugin` | 注入 CSS 颜色名                                      |
| 80    | `colorPlugin`      | 颜色通道插值                                         |
| 70    | `relativePlugin`   | `+=` `-=` 等相对值                                   |
| 60    | `svgPlugin`        | SVG 几何值                                           |
| 50    | `interpPlugin`     | 含数字的字符串                                       |
| 0     | `initPlugin`       | 兜底：把 `from` / `to` 转成 `between` 数字数组       |

也就是说：**`init` 只要负责把值变成数字，生成补间可以交给 order 0 的兜底插件**；`update` 只要负责把数字变成最终值，写入目标可以交给 order 100 的插件。

## init 与 update 的约定

`init(tween, terminate)` 通常做三件事：

- 判断是否接管：`if (tween.prop !== "xxx") return;` —— 返回 `undefined` 表示「不处理，继续往下传」。
- 读取 `tween.to` / `tween.from`（`unknown`）、`tween.prop`、`tween.unit`、`tween.round`、`tween.animatedTarget`。
- 写入 `tween.between`（`{ from, to, round }[]`），或者只写 `tween.from` / `tween.to` / `tween.unit` 让兜底插件生成。

`update(tween, value, terminate)`：

- `value` 当前是 `string | number[]`（多通道值就是数组）。
- 返回 `string` / `number[]` 会继续传给下一个插件；返回 `undefined` 表示不处理；返回 `terminate` 结束本次更新。
- **不能返回 `number`**，返回值必须是 `string | number[] | void | undefined | typeof TERMINATE`。

`terminate` 参数就是 `TERMINATE`，它是个 Symbol。在 `init` 里返回它会终止后续（更低 order 的）插件；在 `update` 里返回它会结束本次更新。

插件可以用 `tween.data` 在 `init` 和 `update` 之间传递状态（内置插件用 `data.css`、`data.color`、`data.svg`、`data.interp`），`tween.animatedTarget` 上也可以挂自定义数据。

## 示例：让属性名支持路径写法

内置的写回插件只会做 `target[prop] = value`，所以 `{ "bar.width": 100 }` 这样的写法写不进去。当值需要落到**嵌套结构**上时——状态仓库、第三方库对象（`mesh.material.opacity`）、Canvas / WebGL 的配置对象——就适合写一个插件：

```js
import { definePlugin } from "lwa";

const pathPlugin = definePlugin({
  order: 98, // 紧挨着最外层的写回插件（100）
  init(tween) {
    if (!tween.prop.includes(".")) return;

    // 起点：沿路径读当前值
    tween.from = tween.prop
      .split(".")
      .reduce((o, k) => o[k], tween.animatedTarget.target);
  },
  update(tween, value, terminate) {
    if (!tween.prop.includes(".")) return;

    // 沿路径写回
    const keys = tween.prop.split(".");
    const last = keys.pop();
    const target = keys.reduce((o, k) => o[k], tween.animatedTarget.target);

    // 和内置的写回插件一样，记得补上单位
    let val = Array.isArray(value) ? value[0] : value;
    if (tween.unit) val += tween.unit;

    target[last] = val;
    return terminate; // 已自己写回，终止后续 update
  },
});

lwa.use(pathPlugin);

const state = { bar: { width: 0 }, text: { value: 0 } };

lwa(
  state,
  { "bar.width": 100, "text.value": 100 },
  { duration: 1500, round: 1 },
);
```

插件只负责「怎么读、写到哪」，**值本身仍然交给内置插件处理**，所以同一套路径写法可以直接写带单位的值、颜色、相对值：

```js
lwa(state, {
  "bar.width": "100%", // 交给 interpPlugin 解析单位
  "bar.color": "#f87171", // 交给 colorPlugin 做颜色通道插值
  "bar.opacity": "+=0.2", // 交给 relativePlugin 做相对值
});
```

## 注意事项

- 注册是**全局**的，`use()` 会影响之后创建的所有动画，记得让 `init` / `update` 在不认识当前属性时直接 `return`。
- `order` 决定接管时机：想在内置插件之前抢属性就用大于 90 的值；想拿到「已经是数字」的值就用小于 50 的值。
- 只有值需要**多通道**（如颜色 4 通道）时才需要自己构造 `between` 数组，否则交给兜底插件更简单。
- `tween.data` 是插件自己的命名空间，请用不易冲突的键名。
