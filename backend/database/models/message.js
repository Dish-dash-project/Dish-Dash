module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        senderId: { type: DataTypes.INTEGER, allowNull: false },
        roomId: { type: DataTypes.INTEGER, allowNull: false },
        text: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: true });
    Message.associate = models => {
        Message.belongsTo(models.User, { foreignKey: 'senderId' });
        Message.belongsTo(models.Room, { foreignKey: 'roomId' });
    };
    return Message;
};