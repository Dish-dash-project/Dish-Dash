module.exports = (sequelize, DataTypes) => {
    const Review = sequelize.define('Review', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        customerId: { type: DataTypes.INTEGER, allowNull: false },
        restaurantId: { type: DataTypes.INTEGER, allowNull: true },
        menuId: { type: DataTypes.INTEGER, allowNull: true },
        rating: { type: DataTypes.INTEGER, allowNull: false },
        comment: { type: DataTypes.STRING, allowNull: true }
    }, { timestamps: true });
    Review.associate = models => {
        Review.belongsTo(models.User, { foreignKey: 'customerId' });
        Review.belongsTo(models.Restaurant, { foreignKey: 'restaurantId', allowNull: true });
        Review.belongsTo(models.Menu, { foreignKey: 'menuId', allowNull: true });
    };
    return Review;
};