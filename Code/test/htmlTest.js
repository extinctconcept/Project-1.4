const assert = require('chai').assert;
const header = require('../html/static/header');

//results 
let helloResult = header.sayHello();
let numberResult = header.addNumbers(5, 5);

describe('header.js', function () {
    describe('importantTestOne()', function () {
        it('sayHello should return hello', function () {
            assert.equal(helloResult, 'hello')
        });

        it('sayHello should return type string', function () {
            assert.typeOf(helloResult, 'string');
        });
    });



    describe('importantTestOne()', function () {
        it('addNumbers should be > 5', function () {
            assert.isAbove(numberResult, 5);
        })

        it('addNumbers should return type number', function () {
            assert.typeOf(numberResult, 'number');
        });
    });
});