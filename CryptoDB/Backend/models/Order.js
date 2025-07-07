'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        type: DataTypes.ENUM('buy', 'sell'),
        amount: DataTypes.DECIMAL,
        price: DataTypes.DECIMAL,
        status: DataTypes.ENUM('open', 'filled', 'cancelled', 'partial')
    }, {
        freezeTableName: true,
        tableName: 'orders'
    });

    Order.associate = function (models) {
        Order.belongsTo(models.User, { foreignKey: 'user_id' });
        Order.belongsTo(models.Asset, { foreignKey: 'base_asset' });
        Order.belongsTo(models.Asset, { foreignKey: 'quote_asset' });
        Order.hasMany(models.AssetTransaction, { foreignKey: 'order_id' });
    };


    return Order;
};
