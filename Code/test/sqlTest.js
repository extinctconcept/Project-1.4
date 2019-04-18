const assert = require('chai').assert;
const db = require('../queries');

// results
// let userCheckTrue = login.Query_Login('test','test');
// let userCheckFalse = login.Query_Login('test','st');


describe('queries.js', function () {
    describe('getUser()', function () {
        it('Should return object if user exists', function () {
            assert.equal(userCheckTrue, true)
        });
        it('Should return false if username and password dont match match', function () {
            let testUser = db.getUser('Polymorph');
            console.log(testUser)
            assert.equal(testUser.username, 'Polymorph');
        });
        it('Should take less than 500ms', function(done) {
            this.timeout(500);
            setTimeout(done, 300);
          });
    });

});
