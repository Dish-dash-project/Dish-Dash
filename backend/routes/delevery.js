const express = require('express');
const router = express.Router();
const deliveryController = require('../controller/deleverie');
const authenticateJWT = require('../auth/auth');

// Get all orders (test endpoint)
router.get('/all', authenticateJWT, deliveryController.getAllOrders);

// Get available orders (this should be first)
router.get('/available', authenticateJWT, deliveryController.getAvailableOrders);

// Create a new delivery
router.post('/', authenticateJWT, deliveryController.createDelivery);

// Get active deliveries for a driver (this should be before /:id routes)
router.get('/driver/:driverId/active', authenticateJWT, deliveryController.getDriverDeliveries);

// Routes with :id parameter
router.get('/:id', authenticateJWT, deliveryController.getDelivery);
router.put('/:id/status', authenticateJWT, deliveryController.updateDeliveryStatus);
router.put('/:id/complete', authenticateJWT, deliveryController.completeDelivery);

module.exports = router;