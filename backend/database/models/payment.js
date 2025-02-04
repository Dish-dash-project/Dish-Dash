module.exports = (sequelize, DataTypes) => {
    const Payment = sequelize.define('Payment', {
        

    
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        currency: {
            type: DataTypes.STRING,
            defaultValue: 'USD',
            allowNull: false
        },
        paymentMethod: {
            type: DataTypes.ENUM('CREDIT_CARD', 'DEBIT_CARD', 'PAYPAL', 'CASH', 'STRIPE'),
            allowNull: false
        },
        paymentStatus: {
            type: DataTypes.ENUM('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED', 'REFUNDED', 'CANCELLED'),
            defaultValue: 'PENDING',
            allowNull: false
        },
   
        cardLast4: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        cardBrand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cardExpiryMonth: {
            type: DataTypes.STRING(2),
            allowNull: true
        },
        cardExpiryYear: {
            type: DataTypes.STRING(4),
            allowNull: true
        },
        billingAddress: {
            type: DataTypes.JSON,
            allowNull: true
        },
        refundReason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        metadata: {
            type: DataTypes.JSON,
            allowNull: true
        },
        errorMessage: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

  

    return Payment;
};