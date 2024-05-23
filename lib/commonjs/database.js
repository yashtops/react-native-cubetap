"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storeData = exports.getData = exports.deleteData = void 0;
var _asyncStorage = _interopRequireDefault(require("@react-native-async-storage/async-storage"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/**
 * Stores a value in AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {string} value - The value to store.
 * @returns {Promise<void>}
 */
const storeData = async (key, value) => {
  try {
    await _asyncStorage.default.setItem(key, value);
  } catch (error) {
    console.error('Error storing data', error);
  }
};

/**
 * Retrieves a value from AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @returns {Promise<string | null>} - The retrieved value, or null if the key does not exist.
 */
exports.storeData = storeData;
const getData = async key => {
  try {
    const value = await _asyncStorage.default.getItem(key);
    return value;
  } catch (error) {
    console.error('Error retrieving data', error);
    return null;
  }
};

/**
 * Deletes a value from AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @returns {Promise<void>}
 */
exports.getData = getData;
const deleteData = async key => {
  try {
    await _asyncStorage.default.removeItem(key);
  } catch (error) {
    console.error('Error deleting data', error);
  }
};
exports.deleteData = deleteData;
//# sourceMappingURL=database.js.map