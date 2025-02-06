const bcrypt = require('bcrypt');
const db = require('./connection');

async function seedDatabase() {
    try {
        const { 
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
        } = db;

        // Create Users with different roles
        const hashedPassword = await bcrypt.hash('password123', 10);
        
        const users = await User.bulkCreate([
            {
                name: 'John Customer',
                email: 'customer@example.com',
                password: hashedPassword,
                role: 'CUSTOMER',
               
                imageUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            {
                name: 'Sarah Customer',
                email: 'sarah@example.com',
                password: hashedPassword,
                role: 'CUSTOMER',
                
                imageUrl: 'https://randomuser.me/api/portraits/women/1.jpg'
            },
            {
                name: 'Bob Restaurant Owner',
                email: 'owner@example.com',
                password: hashedPassword,
                role: 'RESTAURANT_OWNER',
                
                imageUrl: 'https://randomuser.me/api/portraits/men/2.jpg'
            },
            {
                name: 'Maria Restaurant Owner',
                email: 'maria@example.com',
                password: hashedPassword,
                role: 'RESTAURANT_OWNER',
                
                imageUrl: 'https://randomuser.me/api/portraits/women/2.jpg'
            },
            {
                name: 'Dave Driver',
                email: 'driver@example.com',
                password: hashedPassword,
                role: 'DRIVER',
                
                imageUrl: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
            {
                name: 'Lisa Driver',
                email: 'lisa@example.com',
                password: hashedPassword,
                role: 'DRIVER',
                
                imageUrl: 'https://randomuser.me/api/portraits/women/3.jpg'
            },
            {
                name: 'Admin User',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'ADMIN',
                
                imageUrl: 'https://randomuser.me/api/portraits/men/4.jpg'
            }
        ]);

        // Create Categories
        const categories = await Category.bulkCreate([
            {
                name: 'Bakery',
                description: 'Traditional Italian cuisine',
                imageUrl: '🥖'
            },
            {
                name: 'Burger',
                description: 'Authentic Japanese dishes',
                imageUrl: '🍔'
            },
            {
                name: 'Beverage',
                description: 'Spicy Mexican favorites',
                imageUrl: '🥤'
            },
            {
                name: 'Chicken',
                description: 'Flavorful Indian cuisine',
                imageUrl: '🍗'
            },
            {
                name: 'Pizza',
                description: 'Traditional Chinese dishes',
                imageUrl: '🍕'
            },
            {
                name: 'Seafood',
                description: 'Traditional Chinese dishes',
                imageUrl: '🦐'
            }
        ]);

        // Create Restaurants
        const restaurants = await Restaurant.bulkCreate([
            {
                name: "Luigi's Italian",
                description: 'Authentic Italian cuisine in the heart of the city',
                ownerId: users[2].id, // Bob
                imageUrl: 'https://example.com/restaurants/italian.jpg',
                             email: 'info@luigis.com',
                isActive: true,
                openingHours: JSON.stringify({
                    monday: '11:00-22:00',
                    tuesday: '11:00-22:00',
                    wednesday: '11:00-22:00',
                    thursday: '11:00-22:00',
                    friday: '11:00-23:00',
                    saturday: '12:00-23:00',
                    sunday: '12:00-21:00'
                })
            },
            {
                name: 'Sushi Master',
                description: 'Premium sushi and Japanese cuisine',
                ownerId: users[2].id, // Bob
                imageUrl: 'https://example.com/restaurants/japanese.jpg',
                phone: '555-0102',
                email: 'info@sushimaster.com',
                isActive: true,
                openingHours: JSON.stringify({
                    monday: '12:00-22:00',
                    tuesday: '12:00-22:00',
                    wednesday: '12:00-22:00',
                    thursday: '12:00-22:00',
                    friday: '12:00-23:00',
                    saturday: '13:00-23:00',
                    sunday: '13:00-21:00'
                })
            },
            {
                name: 'Taco Fiesta',
                description: 'Authentic Mexican street food',
                ownerId: users[3].id, // Maria
                imageUrl: 'https://example.com/restaurants/mexican.jpg',
                phone: '555-0103',
                email: 'info@tacofiesta.com',
                isActive: true,
                openingHours: JSON.stringify({
                    monday: '10:00-22:00',
                    tuesday: '10:00-22:00',
                    wednesday: '10:00-22:00',
                    thursday: '10:00-22:00',
                    friday: '10:00-23:00',
                    saturday: '11:00-23:00',
                    sunday: '11:00-21:00'
                })
            }
        ]);

        // Create Menu Items
        const menuItems = await MenuItem.bulkCreate([
            // Italian Restaurant Items
            {
                name: 'Margherita Pizza',
                description: 'Classic tomato and mozzarella pizza',
                price: 12.99,
                restaurantId: restaurants[0].id,
                imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.4NRf4CcWlDDAVNCqefmG3gHaJ4&pid=Api&P=0&h=180',
                category: 'Pizza',
                isAvailable: true
            },
            {
                name: 'Spaghetti Carbonara',
                description: 'Creamy pasta with pancetta',
                price: 14.99,
                restaurantId: restaurants[0].id,
                imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.3MJODhMHPQg6v11AKki79QHaFj&pid=Api&P=0&h=180',
                category: 'Pasta',
                isAvailable: true
            },
            // Japanese Restaurant Items
            {
                name: 'California Roll',
                description: 'Crab, avocado, and cucumber roll',
                price: 8.99,
                restaurantId: restaurants[1].id,
                imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.atPuef-O1VVh90zcq_h46gHaE8&pid=Api&P=0&h=180',
                category: 'Sushi',
                isAvailable: true
            },
            {
                name: 'Salmon Nigiri',
                description: 'Fresh salmon over rice',
                price: 6.99,
                restaurantId: restaurants[1].id,
                imageUrl: 'https://tse1.mm.bing.net/th?id=OIP.0ukoC2w_WocLEBLQkeFtaQHaFj&pid=Api&P=0&h=180',
                category: 'Sushi',
                isAvailable: true
            },
            // Mexican Restaurant Items
            {
                name: 'Street Tacos',
                description: 'Three authentic street tacos',
                price: 9.99,
                restaurantId: restaurants[2].id,
                imageUrl: 'https://tse2.mm.bing.net/th?id=OIP.UWBG4IvWYrhX7y_521MEbwHaLH&pid=Api&P=0&h=180',
                category: 'Tacos',
                isAvailable: true
            },
            {
                name: 'Guacamole & Chips',
                description: 'Fresh made guacamole with tortilla chips',
                price: 7.99,
                restaurantId: restaurants[2].id,
                imageUrl: 'https://tse4.mm.bing.net/th?id=OIP.6325mav4-uab53iBFZ20sAHaGk&pid=Api&P=0&h=180',
                category: 'Appetizers',
                isAvailable: true
            }
        ]);

        // Create Locations
        const locations = await Location.bulkCreate([
            {
                latitude: 40.7128,
                longitude: -74.0060,
                address: '123 Main St',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10001',
                type: 'RESTAURANT',
                restaurantId: restaurants[0].id
            },
            {
                latitude: 40.7580,
                longitude: -73.9855,
                address: '456 Park Ave',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10022',
                type: 'RESTAURANT',
                restaurantId: restaurants[1].id
            },
            {
                latitude: 40.7829,
                longitude: -73.9654,
                address: '789 Lexington Ave',
                city: 'New York',
                state: 'NY',
                country: 'USA',
                postalCode: '10065',
                type: 'RESTAURANT',
                restaurantId: restaurants[2].id
            }
        ]);

        // Create Orders
        const orders = await Order.bulkCreate([
            {
                customerId: users[0].id,
                restaurantId: restaurants[0].id,
                status: 'DELIVERED',
                totalPrice: 27.98,
                deliveryAddress: '123 Customer St, New York, NY 10001',
                specialInstructions: 'Please ring doorbell'
            },
            {
                customerId: users[1].id,
                restaurantId: restaurants[1].id,
                status: 'PENDING',
                totalPrice: 15.98,
                deliveryAddress: '456 Customer Ave, New York, NY 10002',
                specialInstructions: 'Extra wasabi please'
            }
        ]);

        // Create Order Items
        const orderItems = await OrderItem.bulkCreate([
            {
                orderId: orders[0].id,
                menuItemId: menuItems[0].id,
                quantity: 2,
                price: 12.99,
                specialInstructions: 'Extra cheese'
            },
            {
                orderId: orders[1].id,
                menuItemId: menuItems[2].id,
                quantity: 2,
                price: 8.99,
                specialInstructions: 'No cucumber'
            }
        ]);

        // Create Reviews
        const reviews = await Review.bulkCreate([
            {
                userId: users[0].id,
                restaurantId: restaurants[0].id,
                rating: 5,
                comment: 'Best Italian food in the city!',
                images: JSON.stringify(['https://example.com/reviews/review1.jpg'])
            },
            {
                userId: users[1].id,
                restaurantId: restaurants[1].id,
                rating: 4,
                comment: 'Great sushi, will order again',
                images: JSON.stringify(['https://example.com/reviews/review2.jpg'])
            }
        ]);

  
        // Create Deliveries
        const deliveries = await Delivery.bulkCreate([
            {
                orderId: orders[0].id,
                driverId: users[4].id,
                status: 'DELIVERED',
                pickupLocation: JSON.stringify({
                    address: '123 Main St',
                    latitude: 40.7128,
                    longitude: -74.0060
                }),
                deliveryLocation: JSON.stringify({
                    address: '123 Customer St',
                    latitude: 40.7200,
                    longitude: -74.0100
                }),
                actualDeliveryTime: new Date(),
                rating: 5
            },
            {
                orderId: orders[1].id,
                driverId: users[5].id,
                status: 'IN_TRANSIT',
                pickupLocation: JSON.stringify({
                    address: '456 Park Ave',
                    latitude: 40.7580,
                    longitude: -73.9855
                }),
                deliveryLocation: JSON.stringify({
                    address: '456 Customer Ave',
                    latitude: 40.7600,
                    longitude: -73.9900
                }),
                estimatedDeliveryTime: new Date(Date.now() + 30 * 60000) // 30 minutes from now
            }
        ]);

        console.log('Database seeded successfully!');
        
    } catch (error) {
        console.error('Error seeding database:', error);
        throw error; // Re-throw the error for handling in the calling function
    }
}

module.exports = seedDatabase;