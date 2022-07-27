// 缓存管理器
export default class LocalStorageUtil {
  static getItem(key, namespace, defaultValue) {
    if (namespace) {
      key = namespace + '-' + key;
    }
    var value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    } else if (arguments.length === 3) {
      return defaultValue;
    }
    return value;
  }

  static setItem(key, value, namespace) {
    if (namespace) {
      key = namespace + '-' + key;
    }
    value = JSON.stringify(value);
    localStorage.setItem(key, value);
  }

  static clearItem(key, namespace) {
    if (namespace) {
      key = namespace + '-' + key;
    }
    localStorage.removeItem(key);
  }
}
