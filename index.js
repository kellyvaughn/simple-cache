(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SimpleCache"] = factory();
	else
		root["SimpleCache"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/factory.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/async-decorator.ts":
/*!********************************!*\
  !*** ./src/async-decorator.ts ***!
  \********************************/
/*! exports provided: StorageAsyncDecorator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"StorageAsyncDecorator\", function() { return StorageAsyncDecorator; });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __generator = (undefined && undefined.__generator) || function (thisArg, body) {\n    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;\n    return g = { next: verb(0), \"throw\": verb(1), \"return\": verb(2) }, typeof Symbol === \"function\" && (g[Symbol.iterator] = function() { return this; }), g;\n    function verb(n) { return function (v) { return step([n, v]); }; }\n    function step(op) {\n        if (f) throw new TypeError(\"Generator is already executing.\");\n        while (_) try {\n            if (f = 1, y && (t = op[0] & 2 ? y[\"return\"] : op[0] ? y[\"throw\"] || ((t = y[\"return\"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;\n            if (y = 0, t) op = [op[0] & 2, t.value];\n            switch (op[0]) {\n                case 0: case 1: t = op; break;\n                case 4: _.label++; return { value: op[1], done: false };\n                case 5: _.label++; y = op[1]; op = [0]; continue;\n                case 7: op = _.ops.pop(); _.trys.pop(); continue;\n                default:\n                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }\n                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }\n                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }\n                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }\n                    if (t[2]) _.ops.pop();\n                    _.trys.pop(); continue;\n            }\n            op = body.call(thisArg, _);\n        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }\n        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };\n    }\n};\nvar StorageAsyncDecorator = /** @class */ (function () {\n    function StorageAsyncDecorator(storageDriver) {\n        this.setStorage(storageDriver);\n    }\n    StorageAsyncDecorator.prototype.setStorage = function (storageDriver) {\n        if (Object.is(localStorage, storageDriver))\n            this.storageDriver = \"localStorage\";\n        if (Object.is(sessionStorage, storageDriver))\n            this.storageDriver = \"sessionStorage\";\n        if (this.isPlainObject(storageDriver))\n            this.storageDriver = storageDriver;\n    };\n    StorageAsyncDecorator.prototype.isPlainObject = function (storageDriver) {\n        return Object.prototype.toString.call(storageDriver) === '[object Object]';\n    };\n    ;\n    StorageAsyncDecorator.prototype.either = function (fn) {\n        var _a;\n        var _this = this;\n        var args = [];\n        for (var _i = 1; _i < arguments.length; _i++) {\n            args[_i - 1] = arguments[_i];\n        }\n        try {\n            if (fn.constructor.name === this.storage[fn]) {\n                return (function () { return __awaiter(_this, void 0, void 0, function () {\n                    var _a;\n                    return __generator(this, function (_b) {\n                        switch (_b.label) {\n                            case 0: return [4 /*yield*/, (_a = this.storage)[fn].apply(_a, args)];\n                            case 1: return [2 /*return*/, _b.sent()];\n                        }\n                    });\n                }); })();\n            }\n            return (_a = this.storage)[fn].apply(_a, args);\n        }\n        catch (error) {\n            console.error(error);\n        }\n    };\n    Object.defineProperty(StorageAsyncDecorator.prototype, \"storage\", {\n        get: function () {\n            if (window && typeof this.storageDriver === \"string\")\n                return window[this.storageDriver];\n            if (this.isPlainObject(this.storageDriver))\n                return this.storageDriver;\n            throw new Error(\"storage driver is not set!\");\n        },\n        enumerable: false,\n        configurable: true\n    });\n    StorageAsyncDecorator.prototype.getItem = function (key) {\n        return this.either(\"getItem\", key);\n    };\n    StorageAsyncDecorator.prototype.setItem = function (key, value) {\n        return this.either(\"setItem\", key, value);\n    };\n    StorageAsyncDecorator.prototype.clear = function () {\n        return this.either(\"clear\");\n    };\n    StorageAsyncDecorator.prototype.removeItem = function (key) {\n        return this.either(\"removeItem\", key);\n    };\n    StorageAsyncDecorator.prototype.archive = function () {\n        return this.either(\"archive\");\n    };\n    return StorageAsyncDecorator;\n}());\n\n\n\n//# sourceURL=webpack://SimpleCache/./src/async-decorator.ts?");

/***/ }),

/***/ "./src/cacher.ts":
/*!***********************!*\
  !*** ./src/cacher.ts ***!
  \***********************/
/*! exports provided: Cacher */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cacher\", function() { return Cacher; });\nvar Cacher = /** @class */ (function () {\n    function Cacher(config) {\n        if (!config.key) {\n            throw new Error(\"A unique id must be set\");\n        }\n        this.cacheId = \"cacher-\" + config.key;\n        this.timeUnits = {\n            \"days\": 1440,\n            \"hours\": 60,\n            \"minutes\": 1,\n        };\n        this.setConfig(config);\n    }\n    Cacher.prototype.getKey = function () {\n        return this.cacheId;\n    };\n    Cacher.prototype.setConfig = function (config) {\n        this.storage = config.storage;\n        this.archiveIfExpired = config.archiveIfExpired || false;\n        this.setExpiration(config.expiration);\n    };\n    Cacher.prototype.setItem = function (key, value, expiration) {\n        if (this.hasValue(key, value)) {\n            return this.storage.setItem(this.cacheKey(key), JSON.stringify(this.buildCachedItem(value, expiration)));\n        }\n    };\n    Cacher.prototype.cacheKey = function (key) {\n        return key + \"-\" + this.cacheId;\n    };\n    Cacher.prototype.getItem = function (key, archiveIfExpired) {\n        if (!this.storage.getItem(this.cacheKey(key)) || !key)\n            return null;\n        var resource = this.getResource(this.cacheKey(key));\n        return this.returnIfNotExpired(resource, this.cacheKey(key), archiveIfExpired);\n    };\n    Cacher.prototype.removeItem = function (key, expiration) {\n        if (expiration && expiration.amount && expiration.unit) {\n            return this.archive(key, expiration);\n        }\n        this.storage.removeItem(key);\n    };\n    Cacher.prototype.archive = function (key, expiration) {\n        var item = JSON.parse(this.storage.getItem(key));\n        if (item && item.value) {\n            var archiveKey = \"deleted-\" + this.cacheKey(key);\n            this.setItem(archiveKey, item, expiration);\n            this.storage.removeItem(key);\n            return archiveKey;\n        }\n    };\n    Cacher.prototype.clear = function () {\n        this.storage.clear();\n    };\n    Cacher.prototype.setExpiration = function (expiration) {\n        if (typeof expiration !== \"object\") {\n            return this.expiration = {\n                amount: 30,\n                unit: \"minutes\",\n                neverExpire: false\n            };\n        }\n        if ((expiration.amount && expiration.unit) || expiration.neverExpire) {\n            this.expiration = expiration;\n        }\n    };\n    Cacher.prototype.futureMinutes = function (expiration) {\n        return expiration && expiration.unit && this.timeUnits[expiration.unit]\n            ? expiration.amount * this.timeUnits[expiration.unit]\n            : this.expiration.amount * this.timeUnits[this.expiration.unit];\n    };\n    Cacher.prototype.expiresAt = function (expiration) {\n        if ((expiration && expiration.neverExpire) || this.expiration.neverExpire)\n            return;\n        var now = new Date();\n        return now.setMinutes(now.getMinutes() + this.futureMinutes(expiration));\n    };\n    Cacher.prototype.neverExpires = function (object) {\n        return (object && object.neverExpire) || this.expiration.neverExpire === true;\n    };\n    Cacher.prototype.buildCachedItem = function (value, expiration) {\n        return {\n            value: value,\n            expiresAt: this.expiresAt(expiration),\n            neverExpire: this.neverExpires(expiration),\n            expiration: expiration ? expiration : this.expiration,\n        };\n    };\n    Cacher.prototype.hasValue = function (key, value) {\n        return value !== undefined && key !== undefined;\n    };\n    Cacher.prototype.expiresAtIsStillInFuture = function (resource) {\n        return Date.now() < resource.expiresAt;\n    };\n    Cacher.prototype.getResource = function (key) {\n        return JSON.parse(this.storage.getItem(key));\n    };\n    Cacher.prototype.returnIfNotExpired = function (resource, key, archiveIfExpired) {\n        if (this.neverExpires(resource) || this.expiresAtIsStillInFuture(resource)) {\n            return resource;\n        }\n        if (archiveIfExpired || this.archiveIfExpired) {\n            this.archive(key, resource.expiration);\n            return resource;\n        }\n        ;\n        console.log(\"CACHED BUSTED FOR: \" + key);\n        this.storage.removeItem(key);\n        return null;\n    };\n    return Cacher;\n}());\n\n\n\n//# sourceURL=webpack://SimpleCache/./src/cacher.ts?");

/***/ }),

/***/ "./src/factory.ts":
/*!************************!*\
  !*** ./src/factory.ts ***!
  \************************/
/*! exports provided: getCache */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCache\", function() { return getCache; });\n/* harmony import */ var _cacher__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cacher */ \"./src/cacher.ts\");\n/* harmony import */ var _async_decorator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./async-decorator */ \"./src/async-decorator.ts\");\n\n\nvar getCache = function (config) {\n    config.storage = new _async_decorator__WEBPACK_IMPORTED_MODULE_1__[\"StorageAsyncDecorator\"](config.storage);\n    return new _cacher__WEBPACK_IMPORTED_MODULE_0__[\"Cacher\"](config);\n};\n\n\n//# sourceURL=webpack://SimpleCache/./src/factory.ts?");

/***/ })

/******/ });
});