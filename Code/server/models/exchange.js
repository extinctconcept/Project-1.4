'use strict';
module.exports = (sequelize, DataTypes) => {
  const exchange = sequelize.define('exchange', {
    exchange_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    game_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    person_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    borrower_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    game_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    exchange_date: {
        allowNull: false,
        type: Sequalize.DATE
    },
    return_date: {
        allowNull: false,
        type: Sequalize.DATE
    }
  }, {});
  exchange.associate = function(models) {
    // associations can be defined here
    exchange.belongsTo(models.persons, {
        foreignKey: 'person_id',
        onDelete: 'CASCADE'
    });       
    exchange.belongsTo(models.game, {
        foreignKey: 'game_id',
        onDelete: 'CASCADE'
    });       
  };
  return exchange;
};
