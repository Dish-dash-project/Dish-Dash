const express = require('express');
const router = express.Router();
const locationController = require('../controller/location');
const authenticateJWT = require('../auth/auth');

// Create a new location
router.post('/', authenticateJWT, locationController.createLocation);

// Get location by ID
router.get('/:id', authenticateJWT, locationController.getLocation);

// Update location
router.put('/:id', authenticateJWT, locationController.updateLocation);

// Get locations by type
router.get('/type/:type', authenticateJWT, locationController.getLocationsByType);

// Get nearby locations
router.get('/nearby', authenticateJWT, locationController.getNearbyLocations);

module.exports = router;