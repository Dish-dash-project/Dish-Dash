module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
      status: {
        type: DataTypes.ENUM(
          'PENDING', 'PAID', 'CONFIRMED', 'READY', 'EXPEDITED',
          'TORESTO', 'TOCUSTMER', 'DELIVERED', 'UNAVAILABLE', 'CANCELED'
        ),
        allowNull: false
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      deliveryAddress: {
        type: DataTypes.STRING,
        allowNull: true
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
      }
    });

    Order.associate = (models) => {
        Order.belongsTo(models.User, { 
            as: 'customer',
            foreignKey: 'customerId'
        });
        Order.belongsTo(models.User, { 
            as: 'driver',
            foreignKey: 'driverId'
        });
        Order.belongsTo(models.Restaurant, {
            foreignKey: 'restaurantId'
        });
        Order.hasMany(models.OrderItem);
    };

    return Order;
};