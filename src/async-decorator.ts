import { StorageLike } from "./interfaces";

export class StorageAsyncDecorator implements StorageLike {
  constructor(private storage: StorageLike) {}

  either(fn: (...args: any) => any | Promise<any>, ...args: any) {
    try {
      if (fn.constructor.name === "AsyncFunction") {
        return (async () => {
          return await fn(...args)
        })()
      }

      return fn(...args);
    } catch (error) {
      console.error(error);
    }
  }

  getItem(key: string) {
    return this.either(this.storage.getItem, key);
  }

  setItem(key: string, value: string) {
    return this.either(this.storage.setItem, key, value);
  }

  clear() {
    return this.either(this.storage.clear);
  }

  removeItem() {
    return this.either(this.storage.removeItem);
  }
}