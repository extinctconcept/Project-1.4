'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    person_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    player_count: DataTypes.STRING,
    art_url: DataTypes.STRING,
    rating: DataTypes.STRING,
    availability_id: DataTypes.INTEGER
  }, {});
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};