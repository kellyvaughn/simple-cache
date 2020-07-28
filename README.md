# Cacher

A tiny library which implements a flexible caching solution with configurations including expirations (only currently supporting hours), never expiring, and the ability to implement any storage mechanism you want so long as they implement the Storage API interface (getItem, setItem, clear, and removeItem)

## To install

```
yarn add simple-frontend-cacher
```

## Usage

The utility class implements the same interface you're used with the native (Storage Web API)[https://developer.mozilla.org/en-US/docs/Web/API/Storage]. Since cacher is just an es6 utility with all static methods and properties you can extend upon it by inheriting from it.

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

Cacher is static utility class so to extend upon it you can simply inherit or inject the class.

## To test

```
yarn test
```