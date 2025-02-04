module.exports = (sequelize, DataTypes) => {
    const MenuItem = sequelize.define('MenuItem', {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      imageUrl: {
        type: DataTypes.TEXT
      }
    });
    return MenuItem;
  };