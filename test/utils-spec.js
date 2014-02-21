var utils = require("../utils.js");

console.log(utils);

describe("Utils", function() {

  describe('isObject', function(){

    it("Should validate an object as object", function() {
      expect(utils.isObject({})).toBe(true);
    });

    it("Should NOT validate an array as object", function() {
      expect(utils.isObject([])).toBe(false);
    });

    it("Should NOT validate a string as object", function() {
      expect(utils.isObject('hello')).toBe(false);
    });

    it("Should NOT validate a number as object", function() {
      expect(utils.isObject(123)).toBe(false);
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

    it("Should NOT copy if input is an Array", function() {
      expect(function(){
        utils.clone([])
      }).toThrow(new TypeError('Arguments to clone function is invalid'));
    });

  });

});