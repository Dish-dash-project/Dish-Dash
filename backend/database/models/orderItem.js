module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define('OrderItem', {
     
        quantity: { 
            type: DataTypes.INTEGER, 
            allowNull: false,
            defaultValue: 1
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        subtotal: {
            type: DataTypes.VIRTUAL,
            get() {
                return this.quantity * this.price;
            }
        }
    }, { 
        timestamps: true,
        tableName: 'OrderItems'
    });

 

    return OrderItem;
};