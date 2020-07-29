// @ts-nocheck
import { Cacher as CacherInstance } from "../cacher";
import { getConfig, expired, hoursInTheFuture } from "../utils";

describe("CACHE EXPIRATION", () => {
  let Cacher: CacherInstance;
  let data: object;
  beforeEach(() => {
    data = { test: "test" };
    Cacher = new CacherInstance(getConfig(), "asd");
  });

  afterEach(() => {
    Cacher.storage.getItem = jest.fn(() => ({ test: "test" }));
  });



  describe("Cacher.expireAt", () => {
    it("should return epoch an timestamp in the future based on expiration settings set by user", () => {
      expect(Cacher.expiresAt({ amount: 61, unit: "minutes" })).toBeGreaterThan(hoursInTheFuture(1));
      expect(Cacher.expiresAt({ amount: 3, unit: "hours" })).toBeGreaterThan(hoursInTheFuture(2));
      expect(Cacher.expiresAt({ amount: 3, unit: "days" })).toBeGreaterThan(hoursInTheFuture(71));
    });

    it("should return epoch timestamp based on defaults IF expiration settings aren't set", () => {
      Cacher.setExpiration({
        minutes: 30,
        unit: "minutes"
      })

      expect(Cacher.expiresAt(null)).toBeGreaterThan(hoursInTheFuture(.99));
    });
  });



  describe("Cacher.buildCachedItem", () => {
    it("should return an object with neverExpire set to true", () => {
      const built = Cacher.buildCachedItem({ amount: 20, unit: "days", expiresAt: true })
      expect(built.expiresAt).toBeDefined();
    });

    it("should return an object with the expiration date", () => {
      const built = Cacher.buildCachedItem({ amount: 20, unit: "minutes" });
      expect(built.expiresAt).toBeDefined();
    });

    it("should return an object with neverExpire false", () => {
      const built = Cacher.buildCachedItem({ amount: 20, unit: "minutes" })
      expect(built.neverExpire).toBe(false);
    });
  });



  describe("Cacher.expiresAtIsStillInFuture", () => {
    it("return true if under expiration", () => {
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

    it("should default to default expiration settings to build future minutes", () => {
      const future = Cacher.futureMinutes();
      expect(future).toBeLessThan(61 * 1);
      expect(future).toBeGreaterThan(59 * 1);
    });
  });



  describe("Cacher.neverExpires", () => {
    it("should return true if expiration.neverExpire = true", () => {
      expect(Cacher.neverExpires({ neverExpire: true })).toBe(true)
    });

    it("should return false if not set and expiration default is false", () => {
      Cacher.setExpiration({ amount: 20, unit: "months", neverExpire: false })
      expect(Cacher.neverExpires()).toBe(false)
    });

    it("should return false if not set", () => {
      Cacher.setExpiration()
      expect(Cacher.neverExpires()).toBe(false)
    });
  });
});