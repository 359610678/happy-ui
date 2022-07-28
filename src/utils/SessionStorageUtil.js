// 缓存管理器
export default class SessionStorageUtil {
  static getItem(key) {
    var val = window.sessionStorage.getItem(key);
    if (val === 'undefined') {
      return null;
    }
    if (val) {
      return JSON.parse(val);
    }
    return val;
  }

  static setItem(key, val) {
    window.sessionStorage.setItem(key, JSON.stringify(val));
  }

  static clearItem(key) {
    window.sessionStorage.removeItem(key);
  }
}
