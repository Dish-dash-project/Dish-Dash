const db = require('../database/connection');

// Create a new location
exports.createLocation = async (req, res) => {
    try {
        const locationData = {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            country: req.body.country,
            postalCode: req.body.postalCode,
            type: req.body.type,
            accuracy: req.body.accuracy,
            altitude: req.body.altitude,
            heading: req.body.heading,
            speed: req.body.speed,
            metadata: req.body.metadata
        };

        const location = await db.Location.create(locationData);
        res.status(201).json({
            success: true,
            data: location
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get location by ID
exports.getLocation = async (req, res) => {
    try {
        const location = await db.Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({
                success: false,
                error: 'Location not found'
            });
        }
        res.status(200).json({
            success: true,
            data: location
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update location
exports.updateLocation = async (req, res) => {
    try {
        const location = await db.Location.findByPk(req.params.id);
        if (!location) {
            return res.status(404).json({
                success: false,
                error: 'Location not found'
            });
        }

        const updatedLocation = await location.update(req.body);
        res.status(200).json({
            success: true,
            data: updatedLocation
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get locations by type
exports.getLocationsByType = async (req, res) => {
    try {
        const locations = await db.Location.findAll({
            where: {
                type: req.params.type,
                isActive: true
            }
        });
        res.status(200).json({
            success: true,
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get nearby locations
exports.getNearbyLocations = async (req, res) => {
    try {
        const { latitude, longitude, radius = 5, type } = req.query; // radius in kilometers
        
        // Using Haversine formula in SQL
        const locations = await db.sequelize.query(`
            SELECT *, 
            (6371 * acos(cos(radians(:latitude)) * cos(radians(latitude)) 
            * cos(radians(longitude) - radians(:longitude)) 
            + sin(radians(:latitude)) * sin(radians(latitude)))) AS distance 
            FROM Locations
            ${type ? "WHERE type = :type AND" : "WHERE"} isActive = true
            HAVING distance < :radius 
            ORDER BY distance
        `, {
            replacements: { latitude, longitude, radius, type },
            type: db.sequelize.QueryTypes.SELECT
        });

        res.status(200).json({
            success: true,
            data: locations
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};