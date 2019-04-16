'use strict';
module.exports = (sequelize, DataTypes) => {
  const persons = sequelize.define('persons', {
    person_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
    },
    username: {
        allowNull: false,
        type: Sequelize.STRING
    },
    first_name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    last_name: {
        allowNull: false,
        type: Sequelize.STRING
    },
    email: {
        allowNull: false,
        type: Sequelize.STRING 
    },
    password: {
        allowNull: false,
        type: Sequelize.STRING
    },
    city: {
        type: Sequelize.STRING 
    },
    state: {
        type: Sequelize.STRING
    },
    zip: {
        type: Sequelize.INTEGER
    }
  }, {
        timestamps: false
  });
  persons.associate = function(models) {
    // associations can be defined here
        persons.hasMany(models.game, {
                foreignKey: 'person_id',
        });
  };
  return persons;
};
