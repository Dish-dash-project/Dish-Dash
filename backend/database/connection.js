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

connection.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.Sequelize = Sequelize;
db.connection = connection;

// Models
const User = require('./models/user')(connection, DataTypes);
const Restaurant = require('./models/restaurant')(connection, DataTypes);
const Menu = require('./models/menu')(connection, DataTypes);
const Category = require('./models/category')(connection, DataTypes);
const Review = require('./models/review')(connection, DataTypes);
const Cart = require('./models/cart')(connection, DataTypes);
const Order = require('./models/order')(connection, DataTypes);
const OrderItem = require('./models/orderItem')(connection, DataTypes);
const Message = require('./models/message')(connection, DataTypes);
const Room = require('./models/room')(connection, DataTypes);

// Associations
Restaurant.belongsTo(User, { foreignKey: 'ownerId' });
Menu.belongsTo(Restaurant, { foreignKey: 'restaurantId' });
Menu.belongsTo(Category, { foreignKey: 'categoryId' });
Review.belongsTo(User, { foreignKey: 'customerId' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantId', allowNull: true });
Review.belongsTo(Menu, { foreignKey: 'menuId', allowNull: true });
Cart.belongsTo(User, { foreignKey: 'customerId' });
Order.belongsTo(User, { foreignKey: 'customerId' });
Order.belongsTo(User, { as: 'Driver', foreignKey: 'driverId' });
OrderItem.belongsTo(Order, { foreignKey: 'orderId' });
OrderItem.belongsTo(Menu, { foreignKey: 'menuId' });
Message.belongsTo(User, { foreignKey: 'senderId' });
Message.belongsTo(Room, { foreignKey: 'roomId' });

// connection.sync({alter : true})

module.exports = db;

