module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
       
    }, { timestamps: true });
   
    return Cart;
};