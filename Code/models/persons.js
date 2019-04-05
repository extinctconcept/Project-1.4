'use strict';
module.exports = (sequelize, DataTypes) => {
  const persons = sequelize.define('persons', {
    username: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.INTEGER
  }, {});
  persons.associate = function(models) {
    // associations can be defined here
  };
  return persons;
};