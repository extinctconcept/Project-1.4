const assert = require('chai').assert;
const login = require('../login');

// results
let userCheckTrue = login.Query_Login('test','test');
let userCheckFalse = login.Query_Login('test','st');


describe('login.js', function () {
    describe('Query_Login()', function () {
        it('Should return true if username and password match', function () {
            assert.equal(userCheckTrue, true)
        });
        it('Should return false if username and password dont match match', function () {
            assert.equal(userCheckFalse, false)
        });
    });

});
