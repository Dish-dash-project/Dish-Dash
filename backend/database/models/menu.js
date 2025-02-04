module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        restaurantId: { type: DataTypes.INTEGER, allowNull: false },
        categoryId: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });
    Menu.associate = models => {
        Menu.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
        Menu.belongsTo(models.Category, { foreignKey: 'categoryId' });
    };
    return Menu;
};