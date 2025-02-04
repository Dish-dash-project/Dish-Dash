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
      }
    });
    return Order;
  };