import DateUtil from 'element-ui/src/utils/DateUtil.js';
import NumberUtil from 'element-ui/src/utils/NumberUtil.js';
// 定制过滤器
export default class Filter {
  static init(Vue) {
    Vue.filter('date-fmt', function(val, format) {
      if (val === null || val === undefined) {
        return val;
      }
      return DateUtil.format(new Date(val), format);
    });

    Vue.filter('date', function(val, format) {
      if (val === null || val === undefined) {
        return val;
      }
      return DateUtil.format(new Date(val), 'yyy-MM-dd');
    });

    Vue.filter('minutes', function(val, format) {
      if (val === null || val === undefined) {
        return val;
      }
      return DateUtil.format(new Date(val), 'yyy-MM-dd HH:mm');
    });

    Vue.filter('time', function(val, format) {
      if (val === null || val === undefined) {
        return val;
      }
      return DateUtil.format(new Date(val), 'yyy-MM-dd HH:mm:ss');
    });

    Vue.filter('empty', function(val) {
      return val === null || val === undefined || val === '' ? '-' : val;
    });

    Vue.filter('long', function(val) {
      if (val === null || val === undefined) {
        return val;
      }
      return NumberUtil.format(val, '#,##0.');
    });

    Vue.filter('percent', function(val) {
      if (val === null || val === undefined) {
        return val;
      }
      return NumberUtil.format(val * 100, '0.00') + '%';
    });
  }
}
