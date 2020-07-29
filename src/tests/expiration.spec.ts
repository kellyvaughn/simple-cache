// @ts-nocheck
import { Cacher as CacherInstance } from "../cacher";
import { getConfig, expired } from "./utils";

describe("CACHE EXPIRATION", () => {
  let Cacher: CacherInstance;
  beforeEach(() => {
    data = { test: "test" };
    Cacher = new CacherInstance(getConfig());
  });

  afterEach(() => {
    Cacher.storage.getItem = jest.fn(() => ({ test: "test" }));
  });



  describe("Cacher.expireAt", () => {
    it("should return epoch an timestamp in the future based on expiration settings set by user", () => {
      expect(Cacher.expiresAt({ amount: 61, unit: "minutes" })).toBeGreaterThan(hoursInTheFuture(1));
      expect(Cacher.expiresAt({ amount: 3, unit: "hours" })).toBeGreaterThan(hoursInTheFuture(3));
      expect(Cacher.expiresAt({ amount: 3, unit: "days" })).toBeGreaterThan(hoursInTheFuture(71));
    });

    it("should return epoch timestamp based on defaults IF expiration settings aren't set", () => {
      Cacher.setExpiration({
        minutes: 30,
        unit: "minutes"
      })

      expect(Cacher.expiresAt(null)).toBeGreaterThan(hoursInTheFuture(1));
    });
  });



  describe("Cacher.buildCachedItem", () => {
    it("should return an object with neverExpire set to true", () => {
      const built = Cacher.buildCachedItem(data, true)
      expect(built.expiresAt).toBe(true);
    });
  });

  describe("Cacher.buildCachedItem", () => {
    it("should return an object with neverExpires undefined", () => {
      const built = Cacher.buildCachedItem(data)
      expect(built.expiresAt).toBeUndefined();
    });
  });

  describe("Cacher.expiresAtIsStillInFuture", () => {
    it("return true if under one hour in the future", () => {
      expect(Cacher.expiresAtIsStillInFuture({ expiresAt: hoursInTheFuture(1) })).toBe(
        true
      );
    });

    it("return false if over one hour in the future", () => {
      const resource = {
        expiresAt: expired,
      };

      expect(Cacher.expiresAtIsStillInFuture(resource)).toBe(false);
    });
  });



  describe("Cacher.futureMinutes", () => {
    it("should return exact minutes in the future", () => {
      const future = Cacher.futureMinutes({ amount: 59, unit: "minutes" });
      expect(future).toBeLessThan(60)
      expect(future).toBeGreaterThan(58)
    });

    it("should return exact hours in the future", () => {
      const future = Cacher.futureMinutes({ amount: 10, unit: "hours" });
      expect(future).toBeLessThan(11 * 60);
      expect(future).toBeGreaterThan(9 * 60);
    });

    it("default settings: should default to 30 in the future", () => {
      const future = Cacher.futureMinutes();
      expect(future).toBeLessThan(31 * 1);
      expect(future).toBeGreaterThan(29 * 1);
    });
  });
});