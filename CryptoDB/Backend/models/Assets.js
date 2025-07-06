'use strict';
module.exports = (sequelize, DataTypes) => {
  const Asset = sequelize.define('Asset', {
    code: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    name: DataTypes.STRING,
    precision: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN
  }, {
    freezeTableName: true,
    tableName: 'assets'
  });

  Asset.associate = function(models) {
    Asset.hasMany(models.Wallet, { foreignKey: 'asset_code' });
  };

  return Asset;
};
