var utils = module.exports;

/**
 * Converts an integer to a hex string
 * @param  {Number} num Incoming color integer
 * @return {String}     Hex color as a string
 */
utils.intToHex = function intToHex(num) {
  return '#' + (num).toString(16);
};

/**
 * Gives a number between a min & a max (inclusive) with an optional precision
 * @param  {Number} min       Minimum num
 * @param  {Number} max       Maximum num
 * @param  {Number} precision Result precision
 * @return {Number}           Random number between the two (inclusive)
 */
utils.random = function random(min, max, precision) {
  precision = precision || 0;

  var multiplier = Math.pow(10, precision);
  var swap;

  if (min > max) {
    swap = min;
    min = max;
    max = swap;
  }

  return Math.round((Math.random() * (max * multiplier - min * multiplier)) + (min * multiplier)) / multiplier;
};
