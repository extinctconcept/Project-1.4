'use strict';
module.exports = (sequelize, DataTypes) => {
  const exchange = sequelize.define('exchange', {
    game_id: DataTypes.INTEGER,
    person_id: DataTypes.INTEGER,
    borrower_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    exchange_date: DataTypes.DATE,
    return_date: DataTypes.DATE
  }, {});
  exchange.associate = function(models) {
    // associations can be defined here
  };
  return exchange;
};