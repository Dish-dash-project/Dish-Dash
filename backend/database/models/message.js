module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM('TEXT', 'IMAGE'),
            defaultValue: 'TEXT'
        },
        read: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        chatId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, { timestamps: true });

    return Message;
};