export const expired = () => new Date().setHours(
  new Date().getHours() - 1
);

export const hoursInTheFuture = (hours: number) => {
  const time = (60 * hours);
  return new Date().setMinutes(
    new Date().getMinutes() + time
  );
};

export const getConfig = () => {
  return {
    key: "never-changing-key",
    storage: {
      getItem: jest.fn(() => JSON.stringify({ value: { test: "test" }, expiresAt: hoursInTheFuture(1) })),
      setItem: jest.fn(),
      removeItem: jest.fn(),
      clear: jest.fn(),
    },
    expiration: {
      amount: 1,
      unit: "hours",
    }
  }
}


export function either(fn: (...args: any) => any | Promise <any>, ...args: any) {
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

export const promiseWait = async (value: any): Promise<any> => {
  return await new Promise((resolve) => setTimeout(() => resolve(value ? value : "test"), 200));
}