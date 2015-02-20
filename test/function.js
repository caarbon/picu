var assert = require('assert');
var utils = require('function-utils');

describe('Function Utils module', function() {
  describe('.curry(fn, [args, ])', function() {
    var base = function(a, b, c) {
      return [a, b, c].join('.');
    };

    it('should throw if not passing any arguments', function() {
      var improper = function() {
        utils.curry();
      };

      assert.throws(improper);
    });

    it('should return an exact copy of a function if only passing a function', function() {
      var newFunc = utils.curry(base);
      assert.equal(typeof newFunc, 'function', 'expecting a function');
      assert.equal(newFunc(1, 3, 5), '1.3.5', 'expecting correct result');
    });

    it('should return function with a fixed first argument', function() {
      var newFunc = utils.curry(base, 'a');
      assert.equal(typeof newFunc, 'function', 'expecting a function');
      assert.equal(newFunc('b', 'c'), 'a.b.c', 'expecting correct result');
    });

    it('should return function with two fixed arguments', function() {
      var newFunc = utils.curry(base, 'x', 'y');
      assert.equal(typeof newFunc, 'function', 'expecting a function');
      assert.equal(newFunc('z'), 'x.y.z', 'expecting correct result');
    });

    it('should return function with all fixed arguments', function() {
      var newFunc = utils.curry(base, 't', 'i', 'm');
      assert.equal(typeof newFunc, 'function', 'expecting a function');
      assert.equal(newFunc('whatever.', 'doesn\'t', 'matter'), 't.i.m', 'expecting correct result');
    });
  });

  describe('.queueUntilReady(prepare, onReady)', function() {
    it('should queue multiple calls until data is ready', function(done) {
      var good = false;
      var prepare = function(done) {
        setTimeout(function() {
          good = true;
          done();
        }, 1000);
      };
      var onReady = function(callback) {
        callback(null, good);
      };

      // this stuff is just needed to check for when all callbacks are done, so test can finish
      var finished = 0;
      var individualCallback = function(err, good) {
        assert.ok(!err, 'should not have an error');
        assert.ok(good, 'should be good to go');

        finished++;
        if (finished === 2) {
          done();
        }
      };

      var queuer = utils.queueUntilReady(prepare, onReady);

      queuer(individualCallback);
      queuer(individualCallback);
    });
  });
});
