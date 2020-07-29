// @ts-nocheck
import { Cacher as CacherInstance } from "../cacher";
import { getConfig } from "./utils";

describe("Cacher base", () => {
  let found: object;
  let data: object;
  let Cacher;

  beforeEach(() => {
    found = {};
    data = { test: "test" };
    Cacher = new CacherInstance(getConfig());
  });

  afterEach(() => {
    Cacher.storage.getItem = jest.fn(() => ({ test: "test" }));
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

    it("should set an item in Cacher.storage with the custom expiration set", () => {
      const value = Cacher.setItem("test", { ...data }, true, { amount: 2, unit: "hours" });
      expect(Cacher.storage.setItem).toBeCalled();
      expect(value && JSON.parse(value).value.neverExpire).toEqual(true);
    });

    it("should NOT set item if  key or value is empty", () => {
      Cacher.setItem();
      expect(Cacher.storage.setItem).not.toBeCalled();
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
          expiresAt: hoursInTheFuture(2),
        });
      });

      Cacher.getItem("test");
      expect(Cacher.storage.getItem).toBeCalled();
      expect(Cacher.storage.removeItem).not.toBeCalled();
      expect(JSON.parse(found).value).toMatchObject(JSON.parse(cached).value);
    });

    it("should always return if resource is set to never expire", () => {
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

  describe("removeItem", () => {
    it("should remove item", () => {

    });


  });
});
