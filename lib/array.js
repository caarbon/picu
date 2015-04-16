var utils = module.exports;

/**
 * Injects something in between each cell of an array
 * It returns a new array, it does not affect the original
 *
 * If passing in a function, it will execute the function and use the returned value
 * The function will recieve the (original) index of the cell preceding it
 *
 * Example:
 *   utils.inbetween(['a', 'b', 'c'], 'x'); // ['a', 'x', 'b', 'x', 'c']
 *   utils.inbetween(['a'], 'x'); // ['a']
 *   utils.inbetween(['a', 'b', 'c'], function(i) {
 *     return 'x' + i;
 *   }); // ['a', 'x0', 'b', 'x1', 'c']
 */
utils.inbetween = function inbetween(arr, thing) {
  for (var result = arr.slice(), i = result.length - 1; i > 0; i--) {
    result.splice(i, 0, typeof thing === 'function' ? thing(i - 1) : thing);
  }

  return result;
};

/**
 * Shuffles an array
 * It returns a new array, it does not affect the original
 *
 * @param  {Mixed[]} arr Base array
 * @return {Mixed[]}     Shuffled array
 */
utils.shuffle = function shuffle(arr) {
  var copy = arr.slice();
  var result = [];
  var index;

  while (copy.length) {
    index = Math.floor( Math.random() * copy.length );
    result.push(copy.splice(index, 1)[0]);
  }

  // force gc
  copy = undefined;

  return result;
};
