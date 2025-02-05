module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('CUSTOMER', 'RESTAURANT_OWNER', 'DRIVER', 'ADMIN'),
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.TEXT
      }
    });
    return User;
  };