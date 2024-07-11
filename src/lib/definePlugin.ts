import { TERMINATE, type Tween } from "./common";

interface Plugin<
  T extends Record<string, unknown> = any,
  U extends Record<string, unknown> = any
> {
  order: number;
  init?: (
    tween: Tween<T, U>,
    terminate: typeof TERMINATE
  ) => void | undefined | typeof TERMINATE;
  update?: (
    tween: Tween<T, U>,
    value: string | number[],
    terminate: typeof TERMINATE
  ) => string | number[] | void | undefined | typeof TERMINATE;
}

function definePlugin<
  T extends Record<string, unknown> = any,
  U extends Record<string, unknown> = any
>(plugin: Plugin<T, U>) {
  return plugin;
}

export { type Plugin, definePlugin };
