var utils = module.exports;
var toString = Object.prototype.toString;

/**
  Given an object, update or add keys on another (deeply)

  Examples:
    utils.extend({ x: 1 }, { x: 2, y: { z: 3 } }); // { x: 2, y: { z: 3 } }

  @param {Object} affected  Object that will be affected
  @param {Object} obj       The object that values will be copied from
*/
utils.extend = function extend(affected, obj) {
  for (var key in obj) {
    if (toString.call(affected[key]) === '[object Object]' && toString.call(obj[key]) === '[object Object]') {
      extend(affected[key], obj[key]);
      continue;
    }

    affected[key] = obj[key];
  }

  return affected;
};
