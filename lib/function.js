var utils = module.exports;
var slice = Array.prototype.slice;
var noOp = function() {};

/**
 * delicious curry - crates a new function, based on a target function,
 * that allows you to call it with fixed arguments
 *
 * @param  {Function} fn Base function we are currying
 * @return {Function}
 *
 * Example:
 * function xyz(x, y, z) {}
 * var myCurry = utils.curry(xyz, 'A'); // 'A' becomes a fixed first argument
 * myCurry('B', 'C'); // will pass 'A', 'B', 'C'
 */
utils.curry = function curry(fn) {
  var args = slice.call(arguments, 1);

  if (typeof fn !== 'function') {
    throw new Error('Curry expects a function');
  }

  return function() {
    // keeping the 'this' of this function, which will be useful for prototype methods
    return fn.apply(this, args.concat(slice.call(arguments)));
  };
};

/**
 * Returns a convenient function which will queue all callbacks until some async logic is ready
 *
 * @param  {Function} prepare Function to prepare async data
 * @param  {Function} onReady Function to call when data is ready
 * @return {Function}         Function that just takes a callback for when it's ready
 *
 * Example:
 * var things = [];
 * function getAllThings(done) { AWS.getAllTheThings(function(err, allThings) { things = allThings; done(); }); }
 * // getAThing will now be a function that takes a callback
 * var getAThing = utils.queueUntilReady(getAllThings, function(callback) { callback(null, things); })
 * // using it
 * getAThing(function(err, things) { console.log(things); })
 * getAThing(function(err, things) { console.log(things); })
 * // the two calls can happen before it's ready, but we will only pull the 'things' once
 *
 * If you don't pass a second function to utils.queueUntilReady it will simply call the onReady w/o any arguments
 * e.g. utils.queueUntilReady(getAllThings);
 */
utils.queueUntilReady = function queueUntilReady(prepare, onReady) {
  var queue = [];
  var ready = false;
  var started = false;

  var flushWithErr = function() {
    var args = Array.prototype.slice.call(arguments);
    var callback;

    while (callback = queue.shift()) {
      callback.apply(callback, args);
    }
  };

  onReady = onReady || function(callback) {
    callback = callback || noOp;
    callback();
  };

  return function(callback) {
    if (ready === true) {
      return onReady(callback);
    }

    queue.push(callback);

    if (started === true) {
      return;
    }
    started = true;

    prepare(function(err) {
      if (err) {
        flushWithErr(err);
        started = false;
        return;
      }

      ready = true;
      prepare = noOp;

      for (var i = 0, l = (queue || []).length; i < l; i++) {
        onReady(queue[i]);
      }
      queue = undefined; // just to make sure things break if we somehow try to re-queue
    });
  };
};
