var assert = require('assert');
var utils = require('../').string;

describe('String Utils module', function() {
  describe('.pluralize(num, string)', function() {
    it('should return a string if no formatting provided', function() {
      assert.equal(utils.pluralize(12, 'blah'), 'blah');
    });

    it('should return the correct form when using {plural}', function() {
      var proto = 'dog{s}';
      assert.equal(utils.pluralize(1, proto), 'dog');
      assert.equal(utils.pluralize(0, proto), 'dogs');
      assert.equal(utils.pluralize(2, proto), 'dogs');
      assert.equal(utils.pluralize(-1, proto), 'dogs');
      assert.equal(utils.pluralize(10, proto), 'dogs');

      assert.equal(utils.pluralize('1', proto), 'dog');
      assert.equal(utils.pluralize('0', proto), 'dogs');
      assert.equal(utils.pluralize('2', proto), 'dogs');
      assert.equal(utils.pluralize('-1', proto), 'dogs');
      assert.equal(utils.pluralize('10', proto), 'dogs');
    });

    it('should return the correct form when using {singular|plural}', function() {
      var proto = 'i have {a goose|geese}';
      assert.equal(utils.pluralize(1, proto), 'i have a goose');
      assert.equal(utils.pluralize(0, proto), 'i have geese');
      assert.equal(utils.pluralize(2, proto), 'i have geese');
      assert.equal(utils.pluralize(-1, proto), 'i have geese');
      assert.equal(utils.pluralize(10, proto), 'i have geese');

      assert.equal(utils.pluralize('1', proto), 'i have a goose');
      assert.equal(utils.pluralize('0', proto), 'i have geese');
      assert.equal(utils.pluralize('2', proto), 'i have geese');
      assert.equal(utils.pluralize('-1', proto), 'i have geese');
      assert.equal(utils.pluralize('10', proto), 'i have geese');
    });

    it('should inject the int when using {#}', function() {
      var proto = 'the number {#} here';
      assert.equal(utils.pluralize(1, proto), 'the number 1 here');
      assert.equal(utils.pluralize(0, proto), 'the number 0 here');
      assert.equal(utils.pluralize(2, proto), 'the number 2 here');
      assert.equal(utils.pluralize(-1, proto), 'the number -1 here');
      assert.equal(utils.pluralize(10, proto), 'the number 10 here');

      assert.equal(utils.pluralize('1', proto), 'the number 1 here');
      assert.equal(utils.pluralize('0', proto), 'the number 0 here');
      assert.equal(utils.pluralize('2', proto), 'the number 2 here');
      assert.equal(utils.pluralize('-1', proto), 'the number -1 here');
      assert.equal(utils.pluralize('10', proto), 'the number 10 here');
    });

    it('should use the correct form when using multiple {} definitions', function() {
      var proto = 'there w{as|ere} {#} pe{rson|ople} in {#} car{s}';
      assert.equal(utils.pluralize(1, proto), 'there was 1 person in 1 car');
      assert.equal(utils.pluralize(0, proto), 'there were 0 people in 0 cars');
      assert.equal(utils.pluralize(2, proto), 'there were 2 people in 2 cars');
      assert.equal(utils.pluralize(-1, proto), 'there were -1 people in -1 cars');
      assert.equal(utils.pluralize(10, proto), 'there were 10 people in 10 cars');

      assert.equal(utils.pluralize('1', proto), 'there was 1 person in 1 car');
      assert.equal(utils.pluralize('0', proto), 'there were 0 people in 0 cars');
      assert.equal(utils.pluralize('2', proto), 'there were 2 people in 2 cars');
      assert.equal(utils.pluralize('-1', proto), 'there were -1 people in -1 cars');
      assert.equal(utils.pluralize('10', proto), 'there were 10 people in 10 cars');
    });
  });

  describe('.pluralize(string)', function() {
    it('should return a string if no formatting provided', function() {
      assert.equal(utils.pluralize('blah'), 'blah');
    });

    it('should return the correct form when using {plural}', function() {
      var proto = 'dog{s}';
      assert.equal(utils.pluralize('1 ' + proto), '1 dog');
      assert.equal(utils.pluralize('0 ' + proto), '0 dogs');
      assert.equal(utils.pluralize('2 ' + proto), '2 dogs');
      assert.equal(utils.pluralize('-1 ' + proto), '-1 dogs');
      assert.equal(utils.pluralize('10 ' + proto), '10 dogs');
    });

    it('should return the correct form when using {singular|plural}', function() {
      var proto = '{goose|geese}';
      assert.equal(utils.pluralize('1 ' + proto), '1 goose');
      assert.equal(utils.pluralize('0 ' + proto), '0 geese');
      assert.equal(utils.pluralize('2 ' + proto), '2 geese');
      assert.equal(utils.pluralize('-1 ' + proto), '-1 geese');
      assert.equal(utils.pluralize('10 ' + proto), '10 geese');
    });

    it('should inject the int when using {#}', function() {
      var proto = 'the number {#} here';
      assert.equal(utils.pluralize('1 ' + proto), '1 the number 1 here');
      assert.equal(utils.pluralize('0 ' + proto), '0 the number 0 here');
      assert.equal(utils.pluralize('2 ' + proto), '2 the number 2 here');
      assert.equal(utils.pluralize('-1 ' + proto), '-1 the number -1 here');
      assert.equal(utils.pluralize('10 ' + proto), '10 the number 10 here');
    });

    it('should use the correct form when using multiple {} definitions', function() {
      var proto = 'there w{as|ere} {#} pe{rson|ople} in {#} car{s}';
      assert.equal(utils.pluralize('1 ' + proto), '1 there was 1 person in 1 car');
      assert.equal(utils.pluralize('0 ' + proto), '0 there were 0 people in 0 cars');
      assert.equal(utils.pluralize('2 ' + proto), '2 there were 2 people in 2 cars');
      assert.equal(utils.pluralize('-1 ' + proto), '-1 there were -1 people in -1 cars');
      assert.equal(utils.pluralize('10 ' + proto), '10 there were 10 people in 10 cars');
    });
  });

  describe('.pad(string, length)', function() {
    it('should pad a string correctly', function() {
      assert.equal(utils.pad('test', 10), 'test      ', 'expecting padded test string');
    });

    it('should just return a string if it\'s >= the passed pad length', function() {
      assert.equal(utils.pad('xyz', 3), 'xyz', 'expecting original string');
      assert.equal(utils.pad('xyz', 1), 'xyz', 'expecting original string');
    });
  });

  describe('.pad(string, length, chr)', function() {
    it('should pad a string correctly', function() {
      assert.equal(utils.pad('test', 12, '-'), 'test--------', 'expecting padded test string');
    });

    it('should just return a string if it\'s >= the passed pad length', function() {
      assert.equal(utils.pad('xyz', 3, '!'), 'xyz', 'expecting original string');
      assert.equal(utils.pad('xyz', 1, '?'), 'xyz', 'expecting original string');
    });
  });

  describe('.replace(template, replacements)', function() {
    it('should prepare a string correctly', function() {
      var result = utils.replace('{{name}} is a {{creature}}. {{name}} likes {{food}}.', {
        name: 'Benedict',
        creature: 'bear',
        food: 'fish'
      });

      assert.equal(result, 'Benedict is a bear. Benedict likes fish.');

      var templateStr = '{{color}} is {{ownership(name)}} favorite color';
      var ownership = function(name) {
        return name.substr(-1) === 's' ? name + '\'' : name + '\'s';
      };

      var funcCallResult1 = utils.replace(templateStr, {
        color: 'Gray',
        name: 'Tim',
        ownership: ownership
      });
      var funcCallResult2 = utils.replace(templateStr, {
        color: 'Orange',
        name: 'Jess',
        ownership: ownership
      });

      assert.equal(funcCallResult1, 'Gray is Tim\'s favorite color');
      assert.equal(funcCallResult2, 'Orange is Jess\' favorite color');
    });
  });

  describe('.replace(template, replacements, pattern)', function() {
    it('should prepare a string correctly', function() {
      var result = utils.replace('~name~ is a ~creature~. ~name~ likes ~food~.', {
        name: 'Benedict',
        creature: 'bear',
        food: 'fish'
      }, /~([^~]+)~/g);

      assert.equal(result, 'Benedict is a bear. Benedict likes fish.');
    });
  });

  describe('.hexToRgb(hex)', function() {
    it('should convert a hex val with a leading #', function() {
      var result = utils.hexToRgb('#bc4bf0');
      assert.ok(Array.isArray(result), 'expecting array');
      assert.equal(result.join(','), '188,75,240', 'expecting correct values');
    });

    it('should convert a 3char hex val with a leading #', function() {
      var result = utils.hexToRgb('#246');
      assert.ok(Array.isArray(result), 'expecting array');
      assert.equal(result.join(','), '34,68,102', 'expecting correct values');
    });

    it('should convert a hex val without a leading #', function() {
      var result = utils.hexToRgb('8b7c69');
      assert.ok(Array.isArray(result), 'expecting array');
      assert.equal(result.join(','), '139,124,105', 'expecting correct values');
    });

    it('should convert a 3char hex val without a leading #', function() {
      var result = utils.hexToRgb('f60');
      assert.ok(Array.isArray(result), 'expecting array');
      assert.equal(result.join(','), '255,102,0', 'expecting correct values');
    });
  });

  describe('.ensureHexColor(color)', function() {
    it('should return the correct hex string', function() {
      var result;

      result = utils.ensureHexColor('#22222ff');
      assert.equal(result, '#22222ff', 'expecting correct color hash');

      result = utils.ensureHexColor('22222ff');
      assert.equal(result, '#22222ff', 'expecting correct color hash');

      result = utils.ensureHexColor('#9f0');
      assert.equal(result, '#99ff00', 'expecting correct color hash');

      result = utils.ensureHexColor('6a8');
      assert.equal(result, '#66aa88', 'expecting correct color hash');
    });

    it('should return the correct hex string when not wanting hash prefix', function() {
      var result;

      result = utils.ensureHexColor('#22222ff', true);
      assert.equal(result, '22222ff', 'expecting correct color hash');

      result = utils.ensureHexColor('22222ff', true);
      assert.equal(result, '22222ff', 'expecting correct color hash');

      result = utils.ensureHexColor('#9f0', true);
      assert.equal(result, '99ff00', 'expecting correct color hash');

      result = utils.ensureHexColor('6a8', true);
      assert.equal(result, '66aa88', 'expecting correct color hash');
    });
  });
});
