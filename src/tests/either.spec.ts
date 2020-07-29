// @ts-nocheck
import { either, promiseWait } from "../utils";

describe("either() promisification function", () => {
  it("should call block function if callback is not async", () => {
    expect(either(() => "test")).toBe("test");
  });

  it("should return resolved promise with value", () => {
    either(promiseWait).then((res: any) => {
      expect(res).toBe("test");
    });
  });
});