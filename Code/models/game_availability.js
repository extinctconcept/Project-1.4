'use strict';
module.exports = (sequelize, DataTypes) => {
  const game_availability = sequelize.define('game_availability', {
    available: DataTypes.INTEGER,
    unavailable: DataTypes.INTEGER,
    pending: DataTypes.INTEGER
  }, {});
  game_availability.associate = function(models) {
    // associations can be defined here
  };
  return game_availability;
};