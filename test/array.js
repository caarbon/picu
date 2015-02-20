var assert = require('assert');
var utils = require('../').array;

describe('Array Utils module', function() {
  describe('.inbetween(arr, thing)', function() {
    var three = ['a', 'b', 'c'];
    var one = ['a'];

    it('should not return the same array', function() {
      var result = utils.inbetween(three, 'x');
      assert.notEqual(result, three, 'expecting new array');
    });

    it('should add String in between each cell', function() {
      var result = utils.inbetween(three, 'tim');
      assert.equal(result.length, 5, 'expecting five cells');
      assert.equal(result[0], three[0], 'expecting correct (original) cell value, at new index');
      assert.equal(result[1], 'tim', 'expecting injected cell');
      assert.equal(result[2], three[1], 'expecting correct (original) cell value, at new index');
      assert.equal(result[3], 'tim', 'expecting injected cell');
      assert.equal(result[4], three[2], 'expecting correct (original) cell value, at new index');
    });

    it('should not add anything to an empty array', function() {
      var result = utils.inbetween([], 'tim');
      assert.equal(result.length, 0, 'expecting empty array');
    });

    it('should not add anything to a single-cell array', function() {
      var result = utils.inbetween(one, 'tim');
      assert.equal(result.length, 1, 'expecting single-cell array');
    });

    it('should add function return value to result', function() {
      var result = utils.inbetween(three, function() {
        return ':beers:';
      });

      assert.equal(result.length, 5, 'expecting five cells');
      assert.equal(result[0], three[0], 'expecting correct (original) cell value, at new index');
      assert.equal(result[1], ':beers:', 'expecting injected cell');
      assert.equal(result[2], three[1], 'expecting correct (original) cell value, at new index');
      assert.equal(result[3], ':beers:', 'expecting injected cell');
      assert.equal(result[4], three[2], 'expecting correct (original) cell value, at new index');
    });

    it('should add function return value to result, with correct indexes', function() {
      var result = utils.inbetween(three, function(i) {
        return 'x' + i;
      });

      assert.equal(result.length, 5, 'expecting five cells');
      assert.equal(result[0], three[0], 'expecting correct (original) cell value, at new index');
      assert.equal(result[1], 'x0', 'expecting injected cell');
      assert.equal(result[2], three[1], 'expecting correct (original) cell value, at new index');
      assert.equal(result[3], 'x1', 'expecting injected cell');
      assert.equal(result[4], three[2], 'expecting correct (original) cell value, at new index');
    });
  });

  describe('.shuffle(arr)', function() {
    it('should not return the same array', function() {
      var base = ['a', 'b', 'c'];
      var result = utils.shuffle(base);
      assert.notEqual(result, base, 'expecting new array');
    });

    it('should shuffle the array', function() {
      // not assuring diff cell values, since it _could_ return the same order
      var base = ['a', 'b', 'c'];
      var result = utils.shuffle(base);

      var sort = function(a, b) {
        return a > b;
      };

      base = base.sort(sort);
      result.sort(sort);

      assert.equal(result.join(''), base.join(''), 'expecting same sorted values');
    });
  });
});
