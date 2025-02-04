module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM('Customer', 'Owner', 'Driver'), allowNull: false },
        latitude: { type: DataTypes.FLOAT, allowNull: true },
        longitude: { type: DataTypes.FLOAT, allowNull: true }
    }, { timestamps: true });
    return User;
};