"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _permission = require("./permission");
Object.keys(_permission).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _permission[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _permission[key];
    }
  });
});
var _bluetooth = require("./bluetooth");
Object.keys(_bluetooth).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _bluetooth[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _bluetooth[key];
    }
  });
});
var _database = require("./database");
Object.keys(_database).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _database[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _database[key];
    }
  });
});
//# sourceMappingURL=index.js.map