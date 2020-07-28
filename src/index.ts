interface CacherConfig {
  storage?: Storage
  expirationTimeInHours?: number
}

interface IResource {
  expiresAt: number
  neverExpire?: boolean
  value: any
}

export class Cacher {
  static storage: Storage;
  static config: CacherConfig;
  static expirationTimeInHours: number;

  static setConfig(config: CacherConfig) {
    Cacher.storage = config.storage || localStorage;
    Cacher.expirationTimeInHours = config.expirationTimeInHours || 1;
  }

  static getItem(key: string): IResource {
    if (!Cacher.storage.getItem(key) || !key) return;
    return Cacher.returnIfNotExpired(Cacher.getResource(key), key);
  }

  static removeItem(key: string): void {
    Cacher.storage.removeItem(key);
  }

  clear(): void {
    Cacher.storage.clear();
  }

  static setItem(key: string, value: any, neverExpire: boolean = false) {
    if (Cacher.hasValue(key, value)) {
      Cacher.storage.setItem(
        key,
        JSON.stringify(Cacher.buildCachedItem(value, neverExpire))
      );
    }
  }

  static get expiresAt(): number {
    const now = new Date();
    return now.setHours(now.getHours() + Cacher.expirationTimeInHours);
  }

  static buildCachedItem(value: any, neverExpire: boolean): IResource {
    return {
      value,
      expiresAt: Cacher.expiresAt,
      neverExpire,
    };
  }

  static hasValue(key: string, value: any): boolean {
    return value !== undefined && key !== undefined;
  }

  static expiresAtIsStillInFuture(resource: IResource): boolean {
    return new Date().getTime() < resource.expiresAt;
  }

  static getResource(key: string): IResource {
    return JSON.parse(Cacher.storage.getItem(key));
  }

  static isSetToNeverExpire(resource: IResource): boolean {
    return resource.neverExpire !== undefined && resource.neverExpire === true;
  }

  static returnIfNotExpired(resource: IResource, key: string): any|undefined {
    if (Cacher.isSetToNeverExpire(resource)) return resource.value;
    if (Cacher.expiresAtIsStillInFuture(resource)) return resource.value;
    Cacher.storage.removeItem(key);
  }
}
