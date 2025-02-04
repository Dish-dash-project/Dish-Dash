module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        customerId: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });
    Cart.associate = models => {
        Cart.belongsTo(models.User, { foreignKey: 'customerId' });
    };
    return Cart;
};