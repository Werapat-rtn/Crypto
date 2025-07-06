'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password_hash: DataTypes.STRING,
    full_name: DataTypes.STRING,
    kyc_status: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'users'
  });

  User.associate = function(models) {
    User.hasMany(models.Wallet, { as: 'wallets', foreignKey: 'user_id' });
  };

  return User;
};
