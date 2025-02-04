module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        orderId: { type: DataTypes.INTEGER, allowNull: false },
        menuId: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });
    OrderItem.associate = models => {
        OrderItem.belongsTo(models.Order, { foreignKey: 'orderId' });
        OrderItem.belongsTo(models.Menu, { foreignKey: 'menuId' });
    };
    return OrderItem;
};