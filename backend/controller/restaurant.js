const {Restaurant} = require('../database/connection'); // Importing the Restaurant model

// Add a new restaurant
exports.addRestaurant = async (req, res) => {
    try {
        const { name, description, imageUrl ,ownerId} = req.body;
        if (!name || !description || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newRestaurant = await Restaurant.create({ name, description, imageUrl ,ownerId});
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: "Error creating restaurant", error: error.message });
    }
};

// Get all restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll();
        res.status(200).json(restaurants);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurants", error: error.message });
    }
};

// Get a single restaurant by ID
exports.getOneRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        res.status(500).json({ message: "Error fetching restaurant", error: error.message });
    }
};

// Update a restaurant
exports.editRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, imageUrl } = req.body;

        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        await restaurant.update({ name, description, imageUrl });
        res.status(200).json({ message: "Restaurant updated successfully", restaurant });
    } catch (error) {
        res.status(500).json({ message: "Error updating restaurant", error: error.message });
    }
};

// Delete a restaurant
exports.deleteRestaurant = async (req, res) => {
    try {
        const { id } = req.params;
        const restaurant = await Restaurant.findByPk(id);
        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant not found" });
        }

        await restaurant.destroy();
        res.status(200).json({ message: "Restaurant deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting restaurant", error: error.message });
    }
};
