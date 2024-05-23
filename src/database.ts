import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Stores a value in AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @param {string} value - The value to store.
 * @returns {Promise<void>}
 */
export const storeData = async (key: string, value: string): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.error('Error storing data', error);
  }
};

/**
 * Retrieves a value from AsyncStorage.
 * @param {string} key - The key under which the value is stored.
 * @returns {Promise<string | null>} - The retrieved value, or null if the key does not exist.
 */
export const getData = async (key: string): Promise<string | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
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
export const deleteData = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting data', error);
  }
};