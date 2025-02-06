const express = require('express');
const router = express.Router();
const orderItemController = require('../controller/orderItem');

// Create a new order item
router.post('/', orderItemController.create);

// Update order item quantity
router.patch('/:id', orderItemController.update);

// Delete order item
router.delete('/:id', orderItemController.delete);

// Get all items for a specific order
router.get('/order/:orderId', orderItemController.getByOrderId);

router.get('/', orderItemController.getAll);


module.exports = router;