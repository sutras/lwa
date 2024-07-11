export function uuid() {
  return Date.now().toString(36) + ((Math.random() * 1e4) >> 0).toString(32);
}
