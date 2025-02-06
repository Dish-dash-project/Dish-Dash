const express = require('express');
const router = express.Router();
const restaurantController = require('../controller/restaurant');

router.post('/restaurants', restaurantController.addRestaurant);
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getOneRestaurant);
router.put('/restaurants/:id', restaurantController.editRestaurant);
router.delete('/restaurants/:id', restaurantController.deleteRestaurant);

module.exports = router;