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

    User.associate = (models) => {
      User.belongsToMany(models.Chat, {
        through: 'ChatParticipants',
        as: 'chats'
      });
      User.hasMany(models.Message, {
        foreignKey: 'senderId',
        as: 'sentMessages'
      });
    };

    return User;
  };