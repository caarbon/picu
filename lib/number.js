var utils = module.exports;

/**
 * Converts an integer to a hex string
 * @param  {Number} num Incoming color integer
 * @return {String}     Hex color as a string
 */
utils.intToHex = function(num) {
  return '#' + (num).toString(16);
};
