var assert = require('assert');
var utils = require('../').number;

describe('Number Utils module', function() {
  describe('.intToHex(num)', function() {
    it('should convert an int to a number', function() {
      assert.equal(utils.intToHex(16720229), '#ff2165', 'expecting carbon pink');
    });
  });

  describe('.random(min, max)', function() {
    it('should return a random number between a max & min', function() {
      var rando;

      rando = utils.random(7, 9);
      assert.ok(rando >= 7 && rando <= 9, 'expecting a number between max & min');
      assert.equal(parseInt('' + rando, 10), rando, 'expecting whole number');

      // should compensate for numbers being swapped
      rando = utils.random(42, 30);
      assert.ok(rando >= 30 && rando <= 42, 'expecting a number between max & min');
      assert.equal(parseInt('' + rando, 10), rando, 'expecting whole number');
    });
  });

  describe('.random(min, max, precision', function() {
    it('should return a random number between a max & min', function() {
      var rando;
      var remainderCheck = /^\d+\.?(\d*)$/, remainder;

      rando = utils.random(7, 9, 3);
      remainder = remainderCheck.exec('' + rando)[1];
      assert.ok(rando >= 7 && rando <= 9, 'expecting a number between max & min');
      assert.ok(remainder.length <= 3, 'expecting remainder with precision <= N');

      // should compensate for numbers being swapped
      rando = utils.random(42, 30, 12);
      remainder = remainderCheck.exec('' + rando)[1];
      assert.ok(rando >= 30 && rando <= 42, 'expecting a number between max & min');
      assert.ok(remainder.length <= 12, 'expecting remainder with precision <= N');
    });
  });
});
