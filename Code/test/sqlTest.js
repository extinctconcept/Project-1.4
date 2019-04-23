const assert = require('chai').assert;
const db = require('../queries');

// results
var testUser;
var testGame;
var testSearch;

db.getUser('Polymorph', (result) => {testUser = result;});
db.getGamesByUser('Polymorph', (result) => {testGame = result;});
db.searchGames('DOOM 3', (result) => {testSearch = result;});


describe('queries.js', function () {
    describe('getUser()', function () {
        it('Should return true if anything is returned', function () {
            assert.isNotNull(testUser, "There was not error")
        });
        it('Should return object if object exists', function () {
            assert.isObject(testUser, "There is an object")
        });
        it('Should return true if person_id is defined', function () {
            assert.isDefined(testUser.person_id, 'person_id is defined');
        });
        it('Should return true if password is defined', function () {
            assert.isDefined(testUser.password, 'password is defined');
        });
        it('Should return true if username is defined', function () {
            assert.isDefined(testUser.username, 'username is defined');
        });
        it('Should return true if first_name is defined', function () {
            assert.isDefined(testUser.first_name, 'first_name is defined');
        });
        it('Should return true if last_name is defined', function () {
            assert.isDefined(testUser.last_name, 'last_name is defined');
        });
        it('Should return true if email is defined', function () {
            assert.isDefined(testUser.email, 'email is defined');
        });
        it('Should return true if phone is defined', function () {
            assert.isDefined(testUser.phone, 'phone is defined');
        });
        it('Should return true if city is defined', function () {
            assert.isDefined(testUser.city, 'city is defined');
        });
        it('Should return true if state is defined', function () {
            assert.isDefined(testUser.state, 'state is defined');
        });
        it('Should return true if zip is defined', function () {
            assert.isDefined(testUser.zip, 'zip is defined');
        });

    });

    describe('getGames()', function () {
        it('Should return true if anything is returned', function () {
            assert.isNotNull(testGame, "There was not error")
        });
        it('Should return object if object exists', function () {
            assert.isObject(testGame[0], "There is an object")
        });
        it('Should return true if person_id is defined', function () {
            assert.isDefined(testGame[0].person_id, 'person_id is defined');
        });
        it('Should return true if game_id is defined', function () {
            assert.isDefined(testGame[0].game_id, 'game_id is defined');
        });
        it('Should return true if title is defined', function () {
            assert.isDefined(testGame[0].title, 'title is defined');
        });
        it('Should return true if player_count is defined', function () {
            assert.isDefined(testGame[0].player_count, 'player_count is defined');
        });
        it('Should return true if art_url is defined', function () {
            assert.isDefined(testGame[0].art_url, 'art_url is defined');
        });
        it('Should return true if rating is defined', function () {
            assert.isDefined(testGame[0].rating, 'rating is defined');
        });
        it('Should return true if availability is defined', function () {
            assert.isDefined(testGame[0].availability_id, 'availability is defined');
        });
        it('Should return true if username is defined', function () {
            assert.isDefined(testGame[0].username, 'username is defined');
        });

    });


    describe('searchGames()', function () {
        console.log('TEST SEARCH  '+testSearch);
        it('Should return true if anything is returned', function () {
            assert.isNotNull(testSearch, "There was not error")
        });
        it('Should return object if object exists', function () {
            assert.isObject(testSearch[0], "There is an object")
        });
        it('Should return true if person_id is defined', function () {
            assert.isDefined(testSearch[0].person_id, 'person_id is defined');
        });
        it('Should return true if game_id is defined', function () {
            assert.isDefined(testSearch[0].game_id, 'game_id is defined');
        });
        it('Should return true if title is defined', function () {
            assert.isDefined(testSearch[0].title, 'title is defined');
        });
        it('Should return true if player_count is defined', function () {
            assert.isDefined(testSearch[0].player_count, 'player_count is defined');
        });
        it('Should return true if art_url is defined', function () {
            assert.isDefined(testSearch[0].art_url, 'art_url is defined');
        });
        it('Should return true if rating is defined', function () {
            assert.isDefined(testSearch[0].rating, 'rating is defined');
        });
        it('Should return true if availability is defined', function () {
            assert.isDefined(testSearch[0].availability_id, 'availability is defined');
        });
        it('Should return true if username is defined', function () {
            assert.isDefined(testSearch[0].username, 'username is defined');
        });

    });

});
