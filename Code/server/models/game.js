'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    game_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    person_id: {
        allowNull: false,
        type: Sequelize.INTEGER
    },
    title: {
        allowNull: false,
        type: Sequelize.STRING
    },
    player_count: {
        type: Sequelize.STRING
    },
    art_url: {
        type: Sequelize.STRING
    },
    rating: {
        type: Sequelize.STRING
    },
    availability_id: DataTypes.INTEGER
  }, {});
  game.associate = function(models) {
    // associations can be defined here
       game.belongsTo(models.persons, {
                foreignKey: 'person_id',
                onDelete: 'CASCADE'
  };
  return game;
};
