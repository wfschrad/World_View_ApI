'use strict';
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING(40),
    hashedPass: DataTypes.STRING.BINARY
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };

  User.prototype.validatePassword = function (password) {
    return bcrypt.compareSync(password, this.hashedPass.toString());
  };

  return User;
};