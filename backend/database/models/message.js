module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        text: { type: DataTypes.STRING, allowNull: false }
    }, { timestamps: true });
   
    return Message;
};