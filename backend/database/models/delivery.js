module.exports = (sequelize, DataTypes) => {
    const Delivery = sequelize.define('Delivery', {
        orderId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        driverId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
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
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('currentLocation');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('currentLocation', value ? JSON.stringify(value) : null);
            }
        },
        pickupLocation: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('pickupLocation');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('pickupLocation', value ? JSON.stringify(value) : null);
            }
        },
        deliveryLocation: {
            type: DataTypes.STRING,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue('deliveryLocation');
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value) {
                this.setDataValue('deliveryLocation', value ? JSON.stringify(value) : null);
            }
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