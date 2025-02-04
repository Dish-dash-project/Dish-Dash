module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define('Location', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        latitude: {
            type: DataTypes.DECIMAL(10, 8),
            allowNull: false,
            validate: {
                min: -90,
                max: 90
            }
        },
        longitude: {
            type: DataTypes.DECIMAL(11, 8),
            allowNull: false,
            validate: {
                min: -180,
                max: 180
            }
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true
        },
        state: {
            type: DataTypes.STRING,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING,
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.ENUM('USER', 'RESTAURANT', 'DELIVERY', 'ADDRESS'),
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        accuracy: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Accuracy of the location in meters'
        },
        altitude: {
            type: DataTypes.FLOAT,
            allowNull: true
        },
        heading: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Direction in degrees from true north'
        },
        speed: {
            type: DataTypes.FLOAT,
            allowNull: true,
            comment: 'Speed in meters per second'
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        metadata: {
            type: DataTypes.JSON,
            allowNull: true,
            comment: 'Additional location data'
        }
    }, {
        timestamps: true,
     
 
    });

    

    return Location;
};