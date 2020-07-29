// @ts-nocheck
import { Cacher as CacherInstance } from "../cacher";
import { getConfig, expired, hoursInTheFuture } from "../utils";

describe("Cacher base", () => {
  let data: object;
  let sampleExpiration = { amount: 20, unit: "minutes" }
  let Cacher;

  beforeEach(() => {
    data = { test: "test" };
    Cacher = new CacherInstance(getConfig(), "testing");
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



  describe("Cacher.setItem", () => {
    it("should set an item in Cacher.storage", () => {
      Cacher.setItem("test", { ...data });
      expect(Cacher.storage.setItem).toBeCalled();
    });

    it("should NOT set item if  key or value is empty", () => {
      Cacher.setItem();
      expect(Cacher.storage.setItem).not.toBeCalled();
    });
  });



  describe("Cacher.getItem", () => {
    it("should get an item from Cacher.storage", () => {
      expect(Cacher.getItem("test")).toBeTruthy();
    });

    it("should return resource if expireAt is less than expiration", () => {
      Cacher.storage.getItem = jest.fn(() => {
        return JSON.stringify({
          value: "test",
          expiresAt: hoursInTheFuture(1),
        });
      });

      Cacher.getItem("test");

      expect(Cacher.storage.getItem).toBeCalled();
      expect(Cacher.storage.removeItem).not.toBeCalled();
    });

    it("should bust cache if expiresAt greater than expiration", () => {
      Cacher.storage.getItem = jest.fn(() => {
        return JSON.stringify({ value: "test", expiresAt: expired() });
      });

      Cacher.getItem("test");
      expect(Cacher.storage.removeItem).toBeCalled();
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



  describe("Cacher.archive", () => {
    it("should not archive an item if getItem returns null", () => {
      Cacher.storage.getItem = jest.fn((key) => { return null })
      Cacher.archive("test", sampleExpiration);
      expect(Cacher.storage.setItem).not.toBeCalled();
    });
  });



  describe("Cacher.removeItem", () => {
    it("should remove item", () => {
      Cacher.removeItem("test");
      expect(Cacher.storage.removeItem).toBeCalled();
    });

    it("should archive item and then remove it from it's previous position in the cache", () => {
      Cacher.getItem = jest.fn((key) => sampleExpiration);
      Cacher.removeItem("test", sampleExpiration);
      expect(Cacher.storage.setItem).toBeCalled();
      expect(Cacher.storage.removeItem).toBeCalled();
    })
  });
});
