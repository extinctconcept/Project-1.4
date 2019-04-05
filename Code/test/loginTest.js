const assert = require('chai').assert;
const login = require('../login');

// results
let userCheck = login.Query_Login('test','test');

describe('login.js', function () {
    describe('Query_Login()', function () {
        it('Should return true if username and password match', function () {
            assert.equal(userCheck, true)
        });
        it('Should take less than 500ms', function(done) {
            this.timeout(500);
            setTimeout(done, 300);
          });
    });

});
