const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurant');

router.post('/', restaurantController.addRestaurant);
router.get('/', restaurantController.getAllRestaurants);
router.get('/:id', restaurantController.getOneRestaurant);
router.put('/:id', restaurantController.editRestaurant);
router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;