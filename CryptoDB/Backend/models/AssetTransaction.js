'use strict';
module.exports = (sequelize, DataTypes) => {
    const AssetTransaction = sequelize.define('AssetTransaction', {
        tx_hash: DataTypes.STRING,
        amount: DataTypes.DECIMAL,
        type: DataTypes.ENUM('transfer', 'order_match', 'deposit', 'withdraw'),
    }, {
        freezeTableName: true,
        tableName: 'asset_transactions'
    });

    AssetTransaction.associate = function (models) {
        AssetTransaction.belongsTo(models.User, { foreignKey: 'user_id' });
        AssetTransaction.belongsTo(models.User, { foreignKey: 'related_user_id' });
        AssetTransaction.belongsTo(models.Asset, { foreignKey: 'asset_code' });
        AssetTransaction.belongsTo(models.Order, { foreignKey: 'order_id' });
    };


    return AssetTransaction;
};
