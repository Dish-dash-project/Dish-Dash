module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        customerId: { type: DataTypes.INTEGER, allowNull: false },
        driverId: { type: DataTypes.INTEGER, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: true });
    Order.associate = models => {
        Order.belongsTo(models.User, { foreignKey: 'customerId' });
        Order.belongsTo(models.User, { as: 'Driver', foreignKey: 'driverId' });
    };
    return Order;
};