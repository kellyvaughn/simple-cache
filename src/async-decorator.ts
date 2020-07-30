import { StorageLike } from "./interfaces";

export class StorageAsyncDecorator implements StorageLike {
  public storageDriver: StorageLike|string

  constructor(storageDriver: StorageLike) {
    this.setStorage(storageDriver);
  }

  setStorage(storageDriver: StorageLike) {
    if (Object.is(localStorage, storageDriver)) this.storageDriver = "localStorage";
    if (Object.is(sessionStorage, storageDriver)) this.storageDriver = "sessionStorage";
    if (this.isPlainObject(storageDriver)) this.storageDriver = storageDriver;
  }

  isPlainObject(storageDriver: StorageLike | string): boolean {
    return Object.prototype.toString.call(storageDriver) === '[object Object]';
  };

  either(fn: string, ...args: any) {
    try {
      if (fn.constructor.name === this.storage[fn]) {
        return (async () => {
          return await this.storage[fn](...args);
        })()
      }

      return this.storage[fn](...args);
    } catch (error) {
      console.error(error);
    }
  }

  get storage() {
    if (window && typeof this.storageDriver === "string") return window[this.storageDriver];
    if (this.isPlainObject(this.storageDriver)) return this.storageDriver;
    throw new Error("storage driver is not set!");
  }

  getItem(key: string) {
    return this.either("getItem", key);
  }

  setItem(key: string, value: any) {
    return this.either("setItem", key, value);
  }

  clear() {
    return this.either("clear");
  }

  removeItem(key: string) {
    return this.either("removeItem", key);
  }

  archive() {
    return this.either("archive");
  }
}