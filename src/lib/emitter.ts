function createEmitter<
  T extends { [p: string]: (...args: any[]) => any } = any
>() {
  const events: { [p in keyof T]: Set<(...args: any[]) => any> } = {} as {
    [p in keyof T]: Set<(...args: any[]) => any>;
  };

  function on<U extends keyof T>(type: U, callback: T[U]) {
    let callbacks = events[type];
    if (!callbacks) {
      callbacks = events[type] = new Set();
    }
    callbacks.add(callback);
  }

  function off<U extends keyof T>(type: U, callback?: T[U]) {
    if (callback) {
      const callbacks = events[type];
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          delete events[type];
        }
      }
    } else {
      delete events[type];
    }
  }

  function once<U extends keyof T>(type: U, callback: T[U]) {
    on(type, function fn(...args: any[]) {
      callback(...args);
      off(type, fn as T[U]);
    } as T[U]);
  }

  function emit<U extends keyof T>(type: U, ...args: Parameters<T[U]>) {
    const callbacks = events[type];
    if (callbacks) {
      callbacks.forEach((callback) => {
        callback(...args);
      });
    }
  }

  return {
    on,
    off,
    once,
    emit,
  };
}

export { createEmitter };
