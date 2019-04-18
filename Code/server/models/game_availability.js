'use strict';
module.exports = (sequelize, DataTypes) => {
  const game_availability = sequelize.define('game_availability', {
    available: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    unavailable: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    pending: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
  }, {
      timestamps: false
  });
  game_availability.associate = function(models) {
    // associations can be defined here
  };
  return game_availability;
};
