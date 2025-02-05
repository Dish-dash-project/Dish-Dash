const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config');

const connection = new Sequelize(
    config.development.database,
    config.development.username,
    config.development.password,
    {
        host: config.development.host,
        dialect: config.development.dialect
    }
);

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

// Import models
db.User = require('../database/models/user')(connection, DataTypes);
db.Restaurant = require('./models/restaurant')(connection, DataTypes);
db.RestaurantCategory = require('./models/category')(connection, DataTypes);
db.Category = require('./models/category')(connection, DataTypes);
db.MenuItem = require('./models/menumItem')(connection, DataTypes);
db.Order = require('./models/order')(connection, DataTypes);
db.OrderItem = require('./models/orderItem')(connection, DataTypes);
db.Address = require('./models/address')(connection, DataTypes);
db.Payment = require('./models/payment')(connection, DataTypes);
db.Review = require('./models/review')(connection, DataTypes);
db.Notification = require('./models/notification')(connection, DataTypes);
db.Delivery = require('./models/delivery')(connection, DataTypes);
db.Location = require('./models/location')(connection, DataTypes);





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

// connection.sync({force: true}).then(() => {
//     console.log('Database synced successfully');
// }).catch((error) => {
//     console.error('Error syncing database:', error);
// });

module.exports = db;