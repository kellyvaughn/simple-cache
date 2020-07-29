import { CacherConfig, IExpirationSettings, IResource, Promisified, StorageLike, StorageLikeAsync } from "./interfaces";

export class Cacher {
  private storage: StorageLike;
  private expiration: IExpirationSettings;
  private timeUnits: object;
  private either: Promisified

  constructor(config: CacherConfig, either: Promisified) {
    if (!config && !config.expiration) throw new Error("default expiration is required");
    this.storage = config.storage || sessionStorage;
    this.either = either;

    this.timeUnits = {
      "days": 1440,
      "hours": 60,
      "minutes": 1,
    };

    this.expiration = {
      amount: 30,
      unit: "minutes"
    };

    this.setExpiration(config.expiration)
  }

  setItem(key: string, value: any, expiration?: IExpirationSettings)  {
    if (this.hasValue(key, value)) {
      return this.storage.setItem(
        key,
        JSON.stringify(this.buildCachedItem(value, expiration))
      );
    }
  }

  getItem(key: string): IResource {
    if (!this.storage.getItem(key) || !key) return null;
    const resource = this.getResource(key);
    return this.returnIfNotExpired(resource, key);
  }

  removeItem(key: string, expiration?: IExpirationSettings): void {
    if (expiration && expiration.amount && expiration.unit) {
      this.softDelete(key, expiration);
    }
    this.storage.removeItem(key);
  }

  private softDelete(key: string, expiration: IExpirationSettings): void {
    const value = this.storage.getItem(`deleted-${key}`);
    this.setItem(
      `deleted-${key}`,
      JSON.parse(value),
      expiration
    );
  }

  getRemovedItem(key: string): IResource {
    const value = this.either(this.storage.getItem, `deleted-${key}`);
    if (value) {
      return JSON.parse(value).resource;
    }
  }

  clear(): void {
    this.storage.clear();
  }

  setExpiration(expiration: IExpirationSettings) {
    if (typeof expiration !== "object") return;

    if ((expiration.amount && expiration.unit) || expiration.neverExpire) {
      this.expiration = expiration;
    }
  }

  private futureMinutes(expiration: IExpirationSettings): number {
    return expiration && expiration.unit && this.timeUnits[expiration.unit]
      ? expiration.amount * this.timeUnits[expiration.unit]
      : this.expiration.amount * this.timeUnits[this.expiration.unit];
  }

  private expiresAt(expiration?: IExpirationSettings): number {
    if (expiration.neverExpire || this.expiration.neverExpire) return;
    const now = new Date();
    return now.setMinutes(now.getMinutes() + this.futureMinutes(expiration));
  }

  private neverExpires(object?: IExpirationSettings|IResource): boolean {
    return (object && object.neverExpire) || this.expiration.neverExpire;
  }

  private buildCachedItem(value: any, expiration?: IExpirationSettings): IResource {
    return {
      value,
      expiresAt: this.expiresAt(expiration),
      neverExpire: this.neverExpires(expiration),
    };
  }

  private hasValue(key: string, value: any): boolean {
    return value !== undefined && key !== undefined;
  }

  private expiresAtIsStillInFuture(resource: IResource): boolean {
    return new Date().getTime() < resource.expiresAt;
  }

  private getResource(key: string): Promise<IResource> {
    return JSON.parse(this.storage.getItem(key));
  }

  private returnIfNotExpired(resource: IResource, key: string): IResource|null {
    if (this.neverExpires(resource)) return resource;
    if (this.expiresAtIsStillInFuture(resource)) return resource;
    this.storage.removeItem(key);
    return null;
  }
}