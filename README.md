# PICU [![Circle CI](https://circleci.com/gh/caarbon/picu.svg?style=svg)](https://circleci.com/gh/caarbon/picu)

PICU is Carbon's [Node] Utilities

Utilities will be added as they are needed.

![](./readme_images/picu.gif)

## NPM

```
npm install picu --save
```

## Arrays

```js
var arrayUtils = require('picu').array;
```

### .inbetween

Injects a new value inbetween each cell

```js
var a = [1, 2, 3];
var b = arrayUtils.inbetween(a, 'x');
// b -> [1, 'x', 2, 'x', 3]
```

### .shuffle

Shuffles an array

```js
var a = [1, 2, 3];
var b = arrayUtils.shuffle(a);
// b -> [3, 1, 2]
```

## Functions

```js
var functionUtils = require('picu').function;
```

### .curry

Creates a new function, based on a target function

```js
var mainFunc = function(a, b, c) {
  return a + '.' + b + '.' + c;
};

mainFunc('x', 'y', 'z'); // 'x.y.z'

var newFunc = functionUtils.curry(mainFunc, 'A', 'O');

newFunc('K'); // 'A.O.K'
```

### .queueUntilReady

Returns a convenient function which will queue all callbacks until some async logic is ready

```js
var resources;

// this function must be `done` before any callback for `getNextResource` will be fired
function getAllResources(done) {
  // assume pullS3Resources will pull a lot of resources from S3, and is therefore slow
  pullS3Resources(function(err, result) {
    resources = result;
    done();
  });
}

// getNextResource will now be a function that takes a callback
var getNextResource = functionUtils.queueUntilReady(getAllResources, function(callback) {
  callback(null, resources.shift());
});

// using it
getNextResource(function(err, resource) {
  console.log(resource);
});

getNextResource(function(err, resource) {
  console.log(resource);
});

// getNextResource can be called before getAllResources is `done`, but callbacks to getNextResource will be queued until getAllResources is `done`
// once getAllResources is `done`, any future call to getNextResource will fire immediately
```

## Strings

```js
var stringUtils = require('picu').string;
```

### .pluralize

Pluralizes a string, based on some input number

```js
stringUtils.pluralize(1, 'dog{s}'); // dog
stringUtils.pluralize(2, 'dog{s}'); // dogs
stringUtils.pluralize(1, 'g{oo|ee}se'); // 'goose'
stringUtils.pluralize(2, 'g{oo|ee}se'); // 'geese'
stringUtils.pluralize('0 g{oo|ee}se'); // '0 geese'
stringUtils.pluralize(2, 'There were {#} dog{s}'); // 'There were 2 dogs'
```

### .capitalize

Simply capitalizes the first letter of a string

```js
stringUtils.capitalize('warren'); // 'Warren'
```

### .pad

Pads (on the right) a string

```js
stringUtils.pad('hello', 10); // 'hello     '
stringUtils.pad('hello', 10, '~'); // 'hello~~~~~'
```

### .replace

Replaces text in a template with passed values

```js
stringUtils.replace('{{valet}} will {{action}} your car', {
  valet: 'Tom M.'
  action: 'pick up'
});
// -> 'Tom M. will pick up your car'

stringUtils.replace('~valet~ will ~action~ your car', {
  valet: 'Tom M.',
  action: 'pick up'
}, /~([^~]+)~/g);
// -> 'Tom M. will pick up your car'

stringUtils.replace('You are assigned to pick up {{ownership(name)}} car', {
  name: 'Jess',
  ownership: function(name) {
    return name.substr(-1) === 's' ? name + '\'' : name + '\'s';
  }
});
// -> 'You are assigned to pick up Jess\' car'
```

### .hexToRgb

Converts a hex color value to an array of [R, G, B]

```js
stringUtils.hexToRgb('ae76fa'); // [ 174, 118, 250 ]
```

### .ensureHexColor

Ensures a color string is a 6 character hash color

```js
stringUtils.ensureHexColor('#f0f0f0'); // -> '#f0f0f0'
stringUtils.ensureHexColor('f0f0f0'); // -> '#f0f0f0'
stringUtils.ensureHexColor('#f0f0f0', true); // -> 'f0f0f0'
stringUtils.ensureHexColor('ba7'); // -> '#bbaa77'
```

### .hexToInt

Converts a hex string to an integer

```js
stringUtils.hexToInt('#f09fa6'); // -> 15769510
stringUtils.hexToInt('#f03'); // -> 16711731
```

### .escapeRegExp

Escapes a string so it can be used in new RegExp(str)

```js
var prepared = stringUtils.escapeRegExp('+2 people. +3 cars');
// prepared = '\\+2 people\\. \\+3 cars'
var expr = new RegExp(prepared);
```

## Numbers

```js
var numberUtils = require('picu').number;
```

### .intToHex

Converts a integer to a hex string

```js
numberUtils.intToHex(15769510); // -> #f09fa6
```

### .random

Gives a random number between a min & max (inclusive) with an optional precision

```js
numberUtils.random(33, 77); // -> 64
numberUtils.random(33, 77); // -> 33
numberUtils.random(33, 77); // -> 70

numberUtils.random(77, 33); // -> 77
numberUtils.random(77, 33); // -> 49
numberUtils.random(77, 33); // -> 51

numberUtils.random(1, 100, 4); // -> 12.8431
```

## Objects

```js
var objectUtils = require('picu').object;
```

### .extend

Given an object, update or add keys on another (deeply)

```js
var result = objectUtils.extend({ a: 12, b: 35 }, { b: 99, z: 404 });
// result = { a: 12, b: 99, z: 404 };
// first object is modified
```
