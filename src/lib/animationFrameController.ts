export default function getAnimationFrameController() {
  if (typeof requestAnimationFrame === "function") {
    return {
      request: requestAnimationFrame,
      cancel: cancelAnimationFrame,
    };
  }

  const fps = 60;
  const callbacks: (((time: number) => void) | 0)[] = [];
  let id = 1;
  let cursor = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;

  function playAll() {
    timer = undefined;
    const cloned = callbacks.slice();
    cursor += callbacks.length;
    callbacks.length = 0;
    cloned.forEach((callback) => {
      if (callback !== 0) {
        callback(Date.now());
      }
    });
  }

  return {
    request(handler: (time: number) => void) {
      callbacks.push(handler);
      if (!timer) {
        timer = setTimeout(playAll, 1000 / fps);
      }
      return id++;
    },
    cancel(id: number) {
      callbacks[id - cursor] = 0;
    },
  };
}
