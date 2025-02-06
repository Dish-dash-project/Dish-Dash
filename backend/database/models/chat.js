module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true // For group chats
    },
    type: {
      type: DataTypes.ENUM('DIRECT', 'GROUP'),
      defaultValue: 'DIRECT'
    },
    lastMessage: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lastMessageTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  });

  return Chat;
}; 