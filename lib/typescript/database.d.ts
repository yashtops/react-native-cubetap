/**
 * Stores a value in AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {string} value - The value to store.
 * @returns {Promise<void>}
 */
export declare const storeData: (key: string, value: string) => Promise<void>;
/**
 * Retrieves a value from AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @returns {Promise<string | null>} - The retrieved value, or null if the key does not exist.
 */
export declare const getData: (key: string) => Promise<string | null>;
/**
 * Deletes a value from AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @returns {Promise<void>}
 */
export declare const deleteData: (key: string) => Promise<void>;
//# sourceMappingURL=database.d.ts.map