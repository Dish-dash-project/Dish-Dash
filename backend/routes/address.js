const express = require('express');
const router = express.Router();
const addressController = require('../controller/address');

// Create a new address
router.post('/', addressController.createAddress);

// Get all addresses
router.get('/', addressController.getAllAddresses);

// Get a single address by ID
router.get('/:id', addressController.getAddressById);

// Update an address by ID
router.put('/:id', addressController.updateAddress);

// Delete an address by ID
router.delete('/:id', addressController.deleteAddress);

module.exports = router;