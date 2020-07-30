import { CacherConfig, IExpirationSettings, IResource, Promisified, StorageLike, StorageLikeAsync } from "./interfaces";

export class Cacher {
  private storage: StorageLike;
  private expiration: IExpirationSettings;
  private timeUnits: object;
  private archiveIfExpired: boolean;
  private cacheId: string;

  constructor(config: CacherConfig) {
    if (!config.key) {
      throw new Error("A unique id must be set");
    }

    this.cacheId = `cacher-${config.key}`;
    this.timeUnits = {
      "days": 1440,
      "hours": 60,
      "minutes": 1,
    };

    this.setConfig(config);
  }

  setConfig(config: CacherConfig) {
    this.setStorage(config);
    this.archiveIfExpired = config.archiveIfExpired || false;
    this.setExpiration(config.expiration)
  }

  setStorage(config: CacherConfig) {
    if (window && config.storage instanceof Storage) {
      this.storage = {
        getItem: config.storage.getItem.bind(window),
        setItem: config.storage.setItem.bind(window),
        removeItem: config.storage.removeItem.bind(window),
        clear: config.storage.clear.bind(window),
      }
    } else {
      this.storage = config.storage;
    }
  }

  getKey() {
    return this.cacheId;
  }

  setItem(key: string, value: any, expiration?: IExpirationSettings)  {
    if (this.hasValue(key, value)) {
      return this.storage.setItem(
        this.cacheKey(key),
        JSON.stringify(this.buildCachedItem(value, expiration))
      );
    }
  }

  cacheKey(key: string) {
    return `${key}-${this.cacheId}`;
  }

  getItem(key: string, archiveIfExpired: boolean): IResource {
    if (!this.storage.getItem(this.cacheKey(key)) || !key) return null;
    const resource = this.getResource(this.cacheKey(key));
    return this.returnIfNotExpired(
      resource,
      this.cacheKey(key),
      archiveIfExpired
    );
  }

  removeItem(key: string, expiration?: IExpirationSettings): string|void {
    if (expiration && expiration.amount && expiration.unit) {
      return this.archive(key, expiration);
    }
    this.storage.removeItem(key);
  }

  archive(key: string, expiration: IExpirationSettings): string|null {
    const item = JSON.parse(this.storage.getItem(key));
    if (item && item.value) {
      const archiveKey = `deleted-${this.cacheKey(key)}`;
      this.setItem(
        archiveKey,
        item,
        expiration
      );

      this.storage.removeItem(key);
      return archiveKey;
    }
  }

  clear(): void {
    this.storage.clear();
  }

  setExpiration(expiration: IExpirationSettings) {
    if (typeof expiration !== "object") {
      return this.expiration = {
        amount: 30,
        unit: "minutes",
        neverExpire: false
      };
    }

    if ((expiration.amount && expiration.unit) || expiration.neverExpire) {
      this.expiration = expiration;
    }
  }

  futureMinutes(expiration: IExpirationSettings): number {
    return expiration && expiration.unit && this.timeUnits[expiration.unit]
      ? expiration.amount * this.timeUnits[expiration.unit]
      : this.expiration.amount * this.timeUnits[this.expiration.unit];
  }

  expiresAt(expiration?: IExpirationSettings): number {
    if ((expiration && expiration.neverExpire) || this.expiration.neverExpire) return;
    const now = new Date();
    return now.setMinutes(now.getMinutes() + this.futureMinutes(expiration));
  }

  neverExpires(object?: IExpirationSettings|IResource): boolean {
    return (object && object.neverExpire) || this.expiration.neverExpire === true;
  }

  buildCachedItem(value: any, expiration?: IExpirationSettings): IResource {
    return {
      value,
      expiresAt: this.expiresAt(expiration),
      neverExpire: this.neverExpires(expiration),
      expiration: expiration ? expiration : this.expiration,
    };
  }

  hasValue(key: string, value: any): boolean {
    return value !== undefined && key !== undefined;
  }

  expiresAtIsStillInFuture(resource: IResource): boolean {
    return Date.now() < resource.expiresAt;
  }

  getResource(key: string): IResource {
    return JSON.parse(this.storage.getItem(key));
  }

  returnIfNotExpired(resource: IResource, key: string, archiveIfExpired: boolean): IResource|null {
    if (this.neverExpires(resource) || this.expiresAtIsStillInFuture(resource)) {
      return resource;
    }

    if (archiveIfExpired || this.archiveIfExpired) {
      this.archive(key, resource.expiration);
      return resource;
    };

    console.log("CACHED BUSTED FOR: " + key)
    this.storage.removeItem(key);
    return null;
  }
}