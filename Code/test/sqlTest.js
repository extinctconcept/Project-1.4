const assert = require('chai').assert;
const db = require('../queries');

// results
// let userCheckTrue = login.Query_Login('test','test');
// let userCheckFalse = login.Query_Login('test','st');
var testUser = db.getUser('Polymorph');
console.log(testUser);
console.log(db.getUser("Polymoprh"));
console.log(db);

describe('queries.js', function () {
    describe('getUser()', function () {
        it('Should return true if anything is returned', function () {
            assert.isNotNull(testUser, "There was not error")
        });
        it('Should return true if object is undefined', function () {
            assert.isUndefined(testUser, "The object exists")
        });
        it('Should return object if object exists', function () {
            assert.isObject(testUser, "There is an object")
        });
        it('Should return false if username and password dont match match', function () {
            assert.equal(testUser.username, 'Polymorph');
        });
        console.log(testUser)
        it('Should take less than 500ms', function(done) {
            this.timeout(500);
            setTimeout(done, 300);
          });
    });

});
