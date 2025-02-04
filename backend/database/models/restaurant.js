module.exports = (sequelize, DataTypes) => {
    const Restaurant = sequelize.define('Restaurant', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        ownerId: { type: DataTypes.INTEGER, allowNull: false }
    }, { timestamps: true });
    Restaurant.associate = models => {
        Restaurant.belongsTo(models.User, { foreignKey: 'ownerId' });
    };
    return Restaurant;
};