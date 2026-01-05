import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

enum STORAGE_KEYS {
  USER = 'user',
  LANGUAGE = 'language',
  THEME = 'theme',
}

const saveItem = (key: STORAGE_KEYS, value: string) => {
  try {
    storage.set(key, value);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const removeItem = (key: STORAGE_KEYS) => {
  try {
    storage.remove(key);
    return true;
  } catch (error) {
    console.log(error);
  }
};

const getItem = (key: STORAGE_KEYS) => {
  try {
    const value = storage.getString(key);
    return value ? value : undefined;
  } catch (error) {
    console.log(error);
  }
};

const clearStorage = () => {
  try {
    storage.clearAll();
  } catch (error) {
    console.log(error);
  }
};

export default {
  removeItem,
  getItem,
  saveItem,
  clearStorage,
  STORAGE_KEYS,
};
