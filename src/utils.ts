
export const expired = () => new Date().setHours(
  new Date().getHours() - 1
);

export const hoursInTheFuture = (hours: number) => new Date().setHours(
  new Date().getHours() + hours
);

export const getConfig = () => {
  return {
    storage: {
      getItem: jest.fn(() => JSON.stringify({ value: { test: "test" }, expiresAt: hoursInTheFuture(1) })),
      setItem: jest.fn((key, value) => ({ key, value: JSON.parse(value)})),
      removeItem: jest.fn(),
      clear: jest.fn()
    },
    expiration: {
    amount: 1,
      unit: "hours",
    }
  }
}

export const either = (fn: (...args: any) => any|Promise<any>, ...args: any) => {
  try {
    if (fn.constructor.name === "AsyncFunction") {
      return (async () => {
        return await fn(...args)
      })()
    }

    return fn(...args);
  } catch (error) {
    console.error(error);
  }
}