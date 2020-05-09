'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING(40),
    hashedPass: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};