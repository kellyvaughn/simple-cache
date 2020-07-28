// @ts-nocheck
import { Cacher } from ".";

describe("Cacher base", () => {
  const expirationTimeInHours = 1;
  const expired = new Date().setHours(
    new Date().getHours() - expirationTimeInHours
  );
  const oneHour = new Date().setHours(
    new Date().getHours() + expirationTimeInHours
  );
  const twoHour = new Date().setHours(new Date().getHours() + 2);
  let found;
  let data;
  let cached = JSON.stringify({ value: { test: "test" }, expiresAt: oneHour });

  beforeEach(() => {
    data = { test: "test" };
    const storage: Storage = {
      getItem: jest.fn(() => (found = cached)),
      setItem: jest.fn(),
      removeItem: jest.fn(),
    };

    Cacher.setConfig({
      storage,
      expirationTimeInHours,
    });
  });

  afterEach(() => {
    Cacher.storage.getItem = jest.fn(() => ({ test: "test" }));
  });

  describe("Cacher.expireAt", () => {
    it("should return one hour from now", () => {
      expect(Cacher.expiresAt).toBeGreaterThan(expired);
      expect(Cacher.expiresAt).not.toBeGreaterThan(twoHour);
    });
  });

  describe("Cacher.hasValue", () => {
    it("return false if key and value arent set", () => {
      expect(Cacher.hasValue()).toBe(false);
    });

    it("return true if key and value are set", () => {
      expect(Cacher.hasValue("test", "test")).toBe(true);
    });
  });

  describe("Cacher.set", () => {
    it("should set an item in Cacher.storage", () => {
      Cacher.setItem("test", { ...data });
      expect(Cacher.storage.setItem).toBeCalled();
    });

    it("should NOT set item if  key or value is empty", () => {
      Cacher.setItem();
      expect(Cacher.storage.setItem).not.toBeCalled();
    });
  });

  describe("Cacher.expiresAtIsStillInFuture", () => {
    it("return true if under one hour in the future", () => {
      expect(Cacher.expiresAtIsStillInFuture({ expiresAt: oneHour })).toBe(
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

  describe("Cacher.get", () => {
    it("should get an item from Cacher.storage", () => {
      expect(Cacher.getItem("test")).toBeTruthy();
    });

    it("should bust cache if expiresAt greater than expiration", () => {
      Cacher.storage.getItem = jest.fn(() => {
        return JSON.stringify({ value: "test", expiresAt: expired });
      });

      Cacher.getItem("test");
      expect(Cacher.storage.removeItem).toBeCalled();
    });

    it("should return resource if expireAt is less than expiration", () => {
      Cacher.storage.getItem = jest.fn(() => {
        JSON.stringify({
          value: "test",
          expiresAt: twoHour,
        });
      });

      Cacher.getItem("test");
      expect(Cacher.storage.getItem).toBeCalled();
      expect(Cacher.storage.removeItem).not.toBeCalled();
      expect(JSON.parse(found).value).toMatchObject(JSON.parse(cached).value);
    });

    it("should return if resource is set to never expire", () => {
      Cacher.storage.getItem = jest.fn(() => {
        JSON.stringify({
          value: "test",
          expiresAt: expired,
          neverExpire: true,
        });
      });

      Cacher.getItem("test");
      expect(Cacher.storage.getItem).toBeCalled();
      expect(Cacher.storage.removeItem).not.toBeCalled();
    });
  });
});
