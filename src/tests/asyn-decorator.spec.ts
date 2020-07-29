// @ts-nocheck
import { StorageAsyncDecorator } from "../async-decorator";
import { promiseWait } from "../utils";

describe("StorageAsyncDecorator", () => {
  let storageAsync = {
    getItem: jest.fn(promiseWait),
    setItem: jest.fn(promiseWait),
    removeItem: jest.fn(promiseWait),
    archive: jest.fn(promiseWait),
  }
  let storage = {
    getItem: jest.fn(() => "test"),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    archive: jest.fn(() => "test"),
  }

  const DecoratorAsync = new StorageAsyncDecorator(storageAsync);
  const DecoratorBlocking = new StorageAsyncDecorator(storage)

  describe("getItem", () => {
    it("should return after promise is resolved", () => {
      const promise = DecoratorAsync.getItem();
      promise.then((res) => {
        expect(DecoratorAsync.storage.getItem).toBeCalled()
        expect(res).toBe("test");
      })
    });

    it("should return value if not async function", () => {
      const res = DecoratorBlocking.getItem();
      expect(DecoratorBlocking.storage.getItem).toBeCalled()
      expect(res).toBe("test")
    });
  });


  describe("setItem", () => {
    it("should return after promise is resolved", () => {
      const promise = DecoratorAsync.setItem();
      promise.then((res) => {
        expect(DecoratorAsync.storage.setItem).toBeCalled()
        expect(res).toBe(undefined);
      })
    });

    it("should return value if not async function", () => {
      DecoratorBlocking.setItem();
      expect(DecoratorBlocking.storage.setItem).toBeCalled()
    });
  });


  describe("removeItem", () => {
    it("should return after promise is resolved", () => {
      const promise = DecoratorAsync.removeItem();
      promise.then((res) => {
        expect(DecoratorAsync.storage.removeItem).toBeCalled()
        expect(res).toBe(undefined);
      });
    });

    it("should return value if not async function", () => {
      const res = DecoratorBlocking.removeItem();
      expect(DecoratorBlocking.storage.removeItem).toBeCalled()
    });
  });

  describe("archive", () => {
    it("should return after promise is resolved", () => {
      const promise = DecoratorAsync.archive();
      promise.then((res) => {
        expect(DecoratorAsync.storage.archive).toBeCalled()
        expect(res).toBe("test");
      });
    });

    it("should return value if not async function", () => {
      const res = DecoratorBlocking.archive();
      expect(DecoratorBlocking.storage.archive).toBeCalled()
      expect(res).toBe("test");
    });
  });
});