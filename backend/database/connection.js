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
const User = require('../database/models/user')(connection, DataTypes);
const Restaurant = require('./models/restaurant')(connection, DataTypes);
const RestaurantCategory = require('./models/category')(connection, DataTypes);
const Category = require('./models/category')(connection, DataTypes);
const MenuItem = require('./models/menumItem')(connection, DataTypes);
const Order = require('./models/order')(connection, DataTypes);
const OrderItem = require('./models/orderItem')(connection, DataTypes);
const Address = require('./models/address')(connection, DataTypes);
const Payment = require('./models/payment')(connection, DataTypes);
const Review = require('./models/review')(connection, DataTypes);
const Notification = require('./models/notification')(connection, DataTypes);
const Delivery = require('./models/delivery')(connection, DataTypes);
const Location = require('./models/location')(connection, DataTypes);





// Restaurant relationships
Restaurant.belongsTo(User, { as: 'owner', foreignKey: 'ownerId' });
Restaurant.belongsTo(RestaurantCategory, { foreignKey: 'categoryId' });
Restaurant.hasMany(Category);

Restaurant.hasMany(MenuItem);
Restaurant.hasMany(Order);
Restaurant.hasMany(Review);
Restaurant.hasMany(Address);
Restaurant.hasMany(Location);

// User relationships
User.hasMany(Restaurant, { as: 'ownedRestaurants', foreignKey: 'ownerId' });
User.hasMany(Order, { as: 'customerOrders', foreignKey: 'customerId' });
User.hasMany(Order, { as: 'driverOrders', foreignKey: 'driverId' });
User.hasMany(Review);
User.hasMany(Address);
User.hasMany(Location);
User.hasMany(Notification);
User.hasMany(Delivery, { as: 'driverDeliveries', foreignKey: 'driverId' });

// Category relationships
Category.belongsTo(Restaurant);
Category.hasMany(MenuItem);

// MenuItem relationships
MenuItem.belongsTo(Category);
MenuItem.belongsTo(Restaurant);
MenuItem.hasMany(OrderItem);

// Order relationships
Order.belongsTo(User, { as: 'customer' });
Order.belongsTo(User, { as: 'driver' });
Order.belongsTo(Restaurant);
Order.hasMany(OrderItem);
Order.hasMany(Payment);
Order.hasOne(Delivery);
Order.hasMany(Notification);

// Location relationships
Location.belongsTo(User);
Location.belongsTo(Restaurant);
Location.hasOne(Delivery);
Location.hasMany(Address);

// Additional relationships
Address.belongsTo(User);

Address.belongsTo(Restaurant);

Address.belongsTo(Location);


Delivery.belongsTo(Order);
Delivery.belongsTo(User, { as: 'driver' });
Delivery.belongsTo(Location);

// connection.sync({force: true}).then(() => {
//     console.log('Database synced successfully');
// }).catch((error) => {
//     console.error('Error syncing database:', error);
// });
// require('./seeds');
module.exports = {
    db,
    models: {
        User,
        Restaurant,
        Category,
        MenuItem,
        Order,
        OrderItem,
        Review,
        Location,
        Address,
        Delivery
    }
}; 