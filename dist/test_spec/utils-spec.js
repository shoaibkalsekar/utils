(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

(function(){

  "use strict";

  var _utils = {
        isEqual : isEqual,
        isFunction : isFunction,
        isObject : isObject,
        clone : clone,
        isArray : isArray,
        isString : isString,
        isEmpty : isEmpty
      },
      _obj = {},
      has = _obj.hasOwnProperty,
      toString = _obj.toString;


// Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) {
      return a !== 0 || 1 / a == 1 / b;
    }
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) {
      return a === b;
    }
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_utils.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _utils.isFunction(bCtor) && (bCtor instanceof bCtor))
                        && ('constructor' in a && 'constructor' in b)) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (has.call(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = has.call(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (has.call(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };


  function clone(obj)
  {
    if(_utils.isObject(obj))
    {
      var _t = {};
      for(var key in obj)
        if(obj.hasOwnProperty(key))
          _t[key] = obj[key];
      return _t;
    }
    else
      return obj;
  };


  function isEqual(a, b)
  {
    return eq(a, b, [], []);
  };

  function isEmpty(obj)
  {
    if(obj === null) {
      return true;
    }
    if(isArray(obj)) {
      return obj.length === 0;
    }
    for (var key in obj) {
      if (has.call(obj, key)) {
        return false;
      }
    }

    return true;
  }

  function isObject(obj)
  {
    return Object.prototype.toString.call(obj) === "[object Object]";
  };

  function isArray(obj) {
    return toString.call(obj) == '[object Array]';
  };

  function isString(obj) {
    return toString.call(obj) == '[object String]';
  };

  function isFunction(func)
  {
    return typeof func === 'function';
  };

  if(module) {
    module.exports = _utils;
  }
  if(window) {
    window.utilities = _utils;
  }

}());
},{}],2:[function(require,module,exports){
var utils = require("../src/utils.js");

console.log(utils);

describe("Utils", function() {

  describe('isObject', function(){

    it("Check Object", function() {
      expect(utils.isObject({})).toBe(true);
    });

    it("Check Array", function() {
      expect(utils.isObject([])).toBe(false);
    });

    it("Check String", function() {
      expect(utils.isObject('hello')).toBe(false);
    });

    it("Check Number", function() {
      expect(utils.isObject(123)).toBe(false);
    });

  });

  describe('isArray', function(){

    it("Check Object", function() {
      expect(utils.isArray({})).toBe(false);
    });

    it("Check Array", function() {
      expect(utils.isArray([])).toBe(true);
    });

    it("Check String", function() {
      expect(utils.isArray('hello')).toBe(false);
    });

    it("Check Number", function() {
      expect(utils.isArray(123)).toBe(false);
    });

  });

  describe('isString', function(){

    it("Check Object", function() {
      expect(utils.isString({})).toBe(false);
    });

    it("Check Array", function() {
      expect(utils.isString([])).toBe(false);
    });

    it("Check String", function() {
      expect(utils.isString('hello')).toBe(true);
    });

    it("Check Number", function() {
      expect(utils.isString(123)).toBe(false);
    });

  });

  describe('Clone Object', function(){

    var input = { a: 1, b: "hello" };
        cloned = utils.clone(input),
        changed_clone = cloned;


    it("Should copy input object by value", function() {
      expect(utils.isEqual(cloned,input)).toBe(true);
    });

    it("Can be changed, without affecting the original object", function() {
      changed_clone.a = 2;
      changed_clone.b = "hey";
      expect(utils.isEqual(changed_clone,input)).toBe(false);
    });

    it("Should copy if input is an Array", function() {
      input = ["a"];
      expect(utils.clone(input)).toBe(input);
    });

  });

  describe("isEmpty", function(){
    it("Should correctly check empty object", function(){
      expect(utils.isEmpty({})).toBe(true);
    });
    it("Should correctly check non-empty object", function(){
      expect(utils.isEmpty({a:"a"})).toBe(false);
    });
    it("Should correctly check empty Array", function(){
      expect(utils.isEmpty([])).toBe(true);
    });
    it("Should correctly check non-empty array", function(){
      expect(utils.isEmpty(["a", "b"])).toBe(false);
    });
  });

});
},{"../src/utils.js":1}]},{},[2])