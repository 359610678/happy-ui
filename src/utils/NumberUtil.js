class NumberUtil {
  static format(val, format = '0.00') {
    if (!format || isNaN(+val)) {
      return val;
    }
    var isNegative, result, decimal, group, posLeadZero, posSeparator, part, szSep, integer;
    var len = format.length;
    var start = format.search(/[0-9\-#]/);
    var prefix = start > 0 ? format.substring(0, start) : '';
    var str = format.split('').reverse().join('');
    var end = str.search(/[0-9\-#]/);
    var offset = len - end;
    var substr = format.substring(offset, offset + 1);
    var index = offset + ((substr === '.' || (substr === ',')) ? 1 : 0);
    var suffix = end > 0 ? format.substring(index, len) : '';

    format = format.substring(start, index);

    val = format.charAt(0) === '-' ? -val : +val;
    isNegative = val < 0 ? val = -val : 0;

    result = format.match(/[^\d\-#]/g);
    decimal = (result && result[result.length - 1]) || '.';
    group = (result && result[1] && result[0]) || ',';
    format = format.split(decimal);

    val = val.toFixed(format[1] && format[1].length);
    val = +(val) + '';

    posLeadZero = format[1] && format[1].lastIndexOf('0');
    part = val.split('.');

    if (!part[1] || (part[1] && part[1].length <= posLeadZero)) {
      val = (+val).toFixed(posLeadZero + 1);
    }
    szSep = format[0].split(group);
    format[0] = szSep.join('');

    posLeadZero = format[0] && format[0].indexOf('0');
    if (posLeadZero > -1) {
      while (part[0].length < (format[0].length - posLeadZero)) {
        part[0] = '0' + part[0];
      }
    } else if (+part[0] === 0) {
      part[0] = '';
    }
    val = val.split('.');
    val[0] = part[0];

    posSeparator = (szSep[1] && szSep[szSep.length - 1].length);
    if (posSeparator) {
      integer = val[0];
      str = '';
      offset = integer.length % posSeparator;
      len = integer.length;
      for (index = 0; index < len; index++) {
        str += integer.charAt(index);
        if (!((index - offset + 1) % posSeparator) && index < len - posSeparator) {
          str += group;
        }
      }
      val[0] = str;
    }
    val[1] = (format[1] && val[1]) ? decimal + val[1] : '';

    result = val.join('');
    if (result === '0' || result === '') {
      isNegative = false;
    }
    return prefix + ((isNegative ? '-' : '') + result) + suffix;
  }
}
export default NumberUtil;
