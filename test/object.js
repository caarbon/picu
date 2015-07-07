var assert = require('assert');
var utils = require('../').object;

describe('Object Utils module', function() {
  describe('.extend(affected, obj)', function() {
    it('should extend an object', function() {
      var affected = {
        a: {
          b: 12,
          c: {}
        },
        d: '100'
      };

      var obj = {
        a: {
          c: {
            x: 99
          }
        },
        y: {
          z: 23
        }
      };

      var expected = {
        a: {
          b: 12,
          c: {
            x: 99
          }
        },
        d: '100',
        y: {
          z: 23
        }
      };

      assert.deepEqual(utils.extend(affected, obj), expected, 'expecting object to be affected correctly');
    });
  });
});
