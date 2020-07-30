# Cacher

A tiny, zero-dependency library which implements additional utilities on top of the Storage API we're all used to. Features include:
- expiration on a global or resource level (hours, minutes, days)
- implement any storage mechanism that implements the Storage API interface
- archiving for building localized history of state
- handle non-blocking and blocking storage operations

## To install

```
yarn add simple-cache
```

## Usage

The utility class implements the same interface you're used with the native (Storage Web API)[https://developer.mozilla.org/en-US/docs/Web/API/Storage].

```js
    const cache = new Cache({
      storage: localStorage || sessionStorage,
      expiration: {
        amount: 1,
        unit: "minutes" || "hours" || "days"
      },
    });

    /**
     * @param key
     * @param value
     * @param expirationSettings - optional
     */
    cache.setItem(
      "resource",
      {
        test:
        "test"
      },
      {
        amount: 60,
        unit: "minutes"|"hours"|"days",
        neverExpire: true|false
      }
    )

    /**
     * @param key name of key being cahed
     * @param value value being stored, uses JSON.stringify for all implemenations currently
     */
    cache.setItem("resource", { test: "test" });

    /**
     * @returns cached resource or undefined if expired
     */
    cache.getItem("resource");

    /**
     * get item return a wrapped version of your data with the expiration date and settings
     * @param {string} resource get from cache
     * @param {boolean} returnOld optional, if expired, return resource and expiration time
     */
    cache.getItem("resource", true);

    /**
     * @returns {void}
     */
    cache.clear()

    /**
     * @returns {void}
     */
    cache.removeItem("resource")

    /**
     * the library assumes soft deleting if you pass
     * expirations to removeItem and soft deleted items
     * can be retrieved from cache.getRemovedItem(original key)
     *
     * if expiration is set, this method will return the key to the archived resource
     * @returns {void|string}
     */
    cache.removeItem("resource", expiration)

    /**
     * remove resource, no archive
     */
    cache.removeItem("resource")
    /**
     * change the global configuration later in the appliction
     * lifecycle
     */
    cache.setExpiration({
      amount: 2,
      unit: "days",
      neverExpire: true, // never expire overrides other settings
    })
```

Cacher is static utility class so to extend upon it you can simply inherit or inject the class.

## Settings
inject config options into the new instances of the class. The flexibility here allows for you to create many different types of storage i.e. one for localStorage, one for sessionStorage.

**Defaults:**
- expiration defaults to 30 minutes
- storage defaults to sessionStorage
- never expire defaults to false

you can change these defaults on a global level by passing a config object into the constructor of the class. This give you the flexibility to generate as many caches as you need.

```js
{
  storage: sessionStorage || localStorage
  expiration: {
    amount: 30,
    unit: "minutes" | "hours" | "days"
  }
}
```

## To test
```
yarn test
```
