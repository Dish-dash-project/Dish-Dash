const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect,
        logging: console.log // Enable logging to see SQL queries
    }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('../database/models/user')(sequelize, DataTypes);
db.Restaurant = require('./models/restaurant')(sequelize, DataTypes);
db.RestaurantCategory = require('./models/category')(sequelize, DataTypes);
db.Category = require('./models/category')(sequelize, DataTypes);
db.MenuItem = require('./models/menumItem')(sequelize, DataTypes);
db.Order = require('./models/order')(sequelize, DataTypes);
db.OrderItem = require('./models/orderItem')(sequelize, DataTypes);
db.Address = require('./models/address')(sequelize, DataTypes);
db.Payment = require('./models/payment')(sequelize, DataTypes);
db.Review = require('./models/review')(sequelize, DataTypes);
db.Notification = require('./models/notification')(sequelize, DataTypes);
db.Delivery = require('./models/delivery')(sequelize, DataTypes);
db.Location = require('./models/location')(sequelize, DataTypes);
db.Chat = require('./models/chat')(sequelize, DataTypes);
db.Message = require('./models/message')(sequelize, DataTypes);

// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Restaurant relationships
db.Restaurant.belongsTo(db.User, { as: 'owner', foreignKey: 'ownerId' });
db.Restaurant.belongsTo(db.RestaurantCategory, { foreignKey: 'categoryId' });
db.Restaurant.hasMany(db.Category);

db.Restaurant.hasMany(db.MenuItem);
db.Restaurant.hasMany(db.Order);
db.Restaurant.hasMany(db.Review);
db.Restaurant.hasMany(db.Address);
db.Restaurant.hasMany(db.Location);

// User relationships
db.User.hasMany(db.Restaurant, { as: 'ownedRestaurants', foreignKey: 'ownerId' });
db.User.hasMany(db.Order, { as: 'customerOrders', foreignKey: 'customerId' });
db.User.hasMany(db.Order, { as: 'driverOrders', foreignKey: 'driverId' });
db.User.hasMany(db.Review);
db.User.hasMany(db.Address);
db.User.hasMany(db.Location);
db.User.hasMany(db.Notification);
db.User.hasMany(db.Delivery, { as: 'driverDeliveries', foreignKey: 'driverId' });

// Category relationships
db.Category.belongsTo(db.Restaurant);
db.Category.hasMany(db.MenuItem);

// MenuItem relationships
db.MenuItem.belongsTo(db.Category);
db.MenuItem.belongsTo(db.Restaurant);
db.MenuItem.hasMany(db.OrderItem);

// Order relationships
db.Order.belongsTo(db.User, { as: 'customer' });
db.Order.belongsTo(db.User, { as: 'driver' });
db.Order.belongsTo(db.Restaurant);
db.Order.hasMany(db.OrderItem);
db.Order.hasMany(db.Payment);
db.Order.hasOne(db.Delivery);
db.Order.hasMany(db.Notification);

// Location relationships
db.Location.belongsTo(db.User);
db.Location.belongsTo(db.Restaurant);
db.Location.hasOne(db.Delivery);
db.Location.hasMany(db.Address);

// Additional relationships
db.Address.belongsTo(db.User);

db.Address.belongsTo(db.Restaurant);

db.Address.belongsTo(db.Location);


db.Delivery.belongsTo(db.Order);
db.Delivery.belongsTo(db.User, { as: 'driver' });
db.Delivery.belongsTo(db.Location);

// Chat associations
db.Chat.belongsToMany(db.User, {
    through: 'ChatParticipants',
    as: 'participants'
});

db.User.belongsToMany(db.Chat, {
    through: 'ChatParticipants',
    as: 'chats'
});

// Message associations
db.Message.belongsTo(db.User, {
    foreignKey: 'senderId',
    as: 'sender'
});

db.Message.belongsTo(db.Chat, {
    foreignKey: 'chatId',
    as: 'chatRoom'
});

db.Chat.hasMany(db.Message, {
    foreignKey: 'chatId',
    as: 'messages',
    onDelete: 'CASCADE'
});

// sequelize.sync({force: true}).then(() => {
//     console.log('Database synced successfully');
// }).catch((error) => {
//     console.error('Error syncing database:', error);
// });
// require('./seeds');
module.exports = db
  
