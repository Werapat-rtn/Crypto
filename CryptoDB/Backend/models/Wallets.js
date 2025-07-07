'use strict';
module.exports = (sequelize, DataTypes) => {
  const Wallet = sequelize.define('Wallet', {
    balance: DataTypes.DECIMAL,
    available_balance: DataTypes.DECIMAL,
    frozen_balance: DataTypes.DECIMAL,
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    asset_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    freezeTableName: true,
    tableName: 'wallets'
  });

  Wallet.associate = function (models) {
    Wallet.belongsTo(models.User, { foreignKey: 'user_id' });
    Wallet.belongsTo(models.Asset, { foreignKey: 'asset_code' });
  };

  return Wallet;
};
