# Cacher

A micro library that implements a flexible caching solution with configurations including expirations, never cache on a person resource basis and the ability to implement any storage mechanism you want so long as they implement the Storage API interface (getItem, setItem, clear, and removeItem)

## How to use

```js
    Cacher.setConfig({
      storage: localStorage,
      expirationTimeInHours: 1,
    });

    // will expire in 1 hour
    Cacher.setItem("resource", { test: "test" })

    // never expires
    Cacher.setItem("resource", { test: "test" }, true);

    // if expired, returns undefined else returns resource
    Cacher.getItem("resource");

    // removes all resources
    Cacher.clear()

    // remove a single item
    Cacher.removeItem("resource")
```