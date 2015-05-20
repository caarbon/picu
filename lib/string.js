var utils = module.exports;

/**
  Based on a number, returns an appropriate string that has the correct wording
  If a number is not passed it will try to parse it from the beginning of the string

  A plural character is defined by wrapping it with {curly brackets}
  Or, you can define singlular vs plural choices like this: {singular|plural}

  Examples:
    utils.pluralize(1, 'dog{s}'); // dog
    utils.pluralize(2, 'dog{s}'); // dogs
    utils.pluralize(1, 'g{oo|ee}se'); // 'goose'
    utils.pluralize(2, 'g{oo|ee}se'); // 'geese'
    utils.pluralize('0 g{oo|ee}se'); // '0 geese'
    utils.pluralize(2, 'There were {#} dog{s}'); // 'There were 2 dogs'

  @param {Number} [num] Number to use for determining pluralization
    (if not set, it will try to parse it out of the beginning of the string)
  @param {String} String Prototype of the string structure
*/
utils.pluralize = function(num, string) {
  if (arguments.length === 1) {
    return utils.pluralize(parseInt(num, 10), num);
  }

  num = +num;
  num = isNaN(num) ? 0 : num;

  var plural = num !== 1;
  var result = '';
  var expr = /\{([^\{\}]*)\}/g;
  var match, token, choices;
  var index = 0;

  while (match = expr.exec(string)) {
    result += string.substr(index, match.index - index);
    token = match[1];

    if (token === '#') {
      result += '' + num;
    } else if (~token.indexOf('|')) {
      choices = token.split('|');
      result += choices[ plural ? 1 : 0 ];
    } else if (plural) {
      result += token;
    }

    index = match.index + match[0].length;
  }

  return result + string.substr(index, string.length);
};

/**
 * Capitalizes text
 *
 * Example:
 *   utils.capitalize('warren'); // 'Warren'
 *
 * @param  {String} string Text to capitalize
 * @return {String}        Capitalized string
 */
utils.capitalize = function(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

/**
 * Pads (on the right) a string
 *
 * Examples:
 *   utils.pad('hello', 10); // 'hello     '
 *   utils.pad('hello', 10, '~'); // 'hello~~~~~'
 *
 * @param  {String} string String to pad
 * @param  {Number} length Length for resulting string
 * @param  {String} [chr]  Optional padding character (defaults to a space)
 * @return {string}        Padded string
 */
utils.pad = function(string, length, chr) {
  chr = chr || ' ';

  if (chr.length !== 1) {
    throw new Error('String utils padding must be a single character');
  }

  var cleanString = require('strip-ansi')(string);

  while (cleanString.length < length) {
    cleanString += chr;
    string += chr;
  }

  return string;
};

/**
 * Replaces text in a template with passed values
 *
 * Examples:
 *   utils.replace('{{valet}} will {{action}} your car', {
 *     valet: 'Tom M.'
 *     action: 'pick up'
 *   }); // 'Tom M. will pick up your car'
 *
 *   utils.replace('~valet~ will ~action~ your car', {
 *     valet: 'Tom M.',
 *     action: 'pick up'
 *   }, /~([^~]+)~/g); // 'Tom M. will pick up your car'
 *
 *   utils.replace('You are assigned to pick up {{ownership(name)}} car', {
 *     name: 'Jess',
 *     ownership: function(name) {
 *       return name.substr(-1) === 's' ? name + '\'' : name + '\'s';
 *     }
 *   }); // 'You are assigned to pick up Jess\' car'
 *
 * @param  {String} template     Template string to make replacements on
 * @param  {Object} replacements Data to use as replacements
 * @param  {RegExp} [pattern]    Pattern to use for template (defaults to mustaches) (must be global)
 * @return {String}              Resulting string
 */
utils.replace = function(template, replacements, pattern) {
  pattern = pattern || /\{\{([^\}]+)\}\}/g;

  return template.replace(pattern, function(match, identifier) {
    var func, val;
    var keys, i;
    var callingFunc = /^([^\(]+)\(([^\)]+)\)$/.exec(identifier);

    if (callingFunc) {
      for (keys = callingFunc[1].split('.'), i = 0; i < keys.length; i++) {
        func = func ? func[ keys[i] ] : replacements[ keys[i] ];

        if (func === 'undefined') {
          return '';
        }
      }

      if (typeof func !== 'function') {
        return '';
      }

      identifier = callingFunc[2];
    }

    for (keys = identifier.split('.'), i = 0; i < keys.length; i++) {
      val = val ? val[ keys[i] ] : replacements[ keys[i] ];

      if (typeof val === 'undefined') {
        return '';
      }
    }

    return func ? func(val) : val;
  });
};

/**
 * Converts a hex color value to an array of [R,G,B]
 * @param  {String}   color Hex color
 * @return {String[]}       Array of R, G, B
 */
utils.hexToRgb = function(color) {
  color = utils.ensureHexColor(color, true);

  var num = parseInt(color, 16);
  return [num >> 16, num >> 8 & 255, num & 255];
};

/**
 * Ensures a color string is a 6 character hash color
 * @param  {String}   color     Incoming color string
 * @param  {Boolean}  [noHash]  If set to true, it won't prefix with a '#'
 * @return {String}             Hex color (e.g. '#f0f0f0')
 */
var leadingHash = /^#/;
utils.ensureHexColor = function(color, noHash) {
  color = ('' + color).replace(leadingHash, '');

  if (color.length === 3) {
    color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  }

  return noHash ? color : '#' + color;
};

/**
 * Converts a hex string to an integer
 * @param  {String} hex Incoming color string
 * @return {Number}        Hex color as an integer
 */
utils.hexToInt = function(hex) {
  return parseInt(utils.ensureHexColor(hex, true), 16);
};

/**
 * Escapes a string so it can be used in new RegExp(str)
 * @param  {String} str Incoming string
 * @return {String}     RegExp safe string
 */
utils.escapeRegExp = function(str) {
  return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
};
