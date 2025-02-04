module.exports = (sequelize, DataTypes) => {
    const Notification = sequelize.define('Notification', {
   
    
        type: {
            type: DataTypes.ENUM(
                'ORDER_STATUS',
                'PAYMENT_STATUS',
                'DELIVERY_STATUS',
                'REVIEW_RECEIVED',
                'ACCOUNT_UPDATE',
                'PROMOTION',
                'SYSTEM_MESSAGE',
                'NEW_ORDER',
                'ORDER_ASSIGNED',
                'CHAT_MESSAGE'
            ),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        data: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Additional data related to the notification'
        },
        priority: {
            type: DataTypes.ENUM('LOW', 'MEDIUM', 'HIGH'),
            defaultValue: 'MEDIUM'
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        readAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        expiresAt: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

 

    return Notification;
};