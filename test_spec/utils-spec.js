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