module.exports = (sequelize, DataTypes) => {
    const Delivery = sequelize.define('Delivery', {
        
 
        status: {
            type: DataTypes.ENUM(
                'PENDING',           // Waiting for driver assignment
                'DRIVER_ASSIGNED',   // Driver has been assigned
                'HEADING_TO_RESTAURANT', // Driver is heading to restaurant
                'AT_RESTAURANT',     // Driver arrived at restaurant
                'PICKED_UP',         // Order picked up from restaurant
                'IN_TRANSIT',        // On the way to customer
                'ARRIVING',          // Nearly at customer location
                'ARRIVED',           // At customer location
                'DELIVERED',         // Successfully delivered
                'FAILED',           // Delivery failed
                'CANCELLED'         // Delivery cancelled
            ),
            defaultValue: 'PENDING',
            allowNull: false
        },
        estimatedPickupTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        actualPickupTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        estimatedDeliveryTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        actualDeliveryTime: {
            type: DataTypes.DATE,
            allowNull: true
        },
        distance: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Distance in kilometers'
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: true,
            comment: 'Estimated duration in minutes'
        },
        currentLocation: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Current driver location {lat, lng}'
        },
        pickupLocation: {
            type: DataTypes.JSON,
            allowNull: false,
            comment: 'Restaurant location {lat, lng, address}'
        },
        deliveryLocation: {
            type: DataTypes.JSON,
            allowNull: false,
            comment: 'Customer delivery location {lat, lng, address}'
        },
        deliveryNotes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        proofOfDelivery: {
            type: DataTypes.STRING,
            allowNull: true,
            comment: 'URL to delivery confirmation photo'
        },
        failureReason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        customerSignature: {
            type: DataTypes.STRING,
            allowNull: true
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: true,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        timestamps: true,
      
    });

  
    return Delivery;
};