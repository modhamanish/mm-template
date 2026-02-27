import { createMMKV } from 'react-native-mmkv';

export const storage = createMMKV();

enum STORAGE_KEYS {
  USER = 'user',
  LANGUAGE = 'language',
  THEME = 'theme',
  AUTH_TOKEN = 'auth_token',
}

const saveItem = (key: STORAGE_KEYS, value: string) => {
  try {
    storage.set(key, value);
    return true;
  } catch {
    // Silent catch
  }
};

const removeItem = (key: STORAGE_KEYS) => {
  try {
    storage.remove(key);
    return true;
  } catch {
    // Silent catch
  }
};

const getItem = (key: STORAGE_KEYS) => {
  try {
    const value = storage.getString(key);
    return value ? value : undefined;
  } catch {
    // Silent catch
  }
};

const clearStorage = () => {
  try {
    storage.clearAll();
  } catch {
    // Silent catch
  }
};

export default {
  removeItem,
  getItem,
  saveItem,
  clearStorage,
  STORAGE_KEYS,
};
