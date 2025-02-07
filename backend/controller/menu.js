const { where } = require('sequelize');
const { MenuItem } = require('../database/connection'); // Importing the MenuItem model

// Add a new menu item
exports.addMenuItem = async (req, res) => {
    try {
        const { name, description, price, imageUrl } = req.body;
        if (!name || !price) {
            return res.status(400).json({ message: "Name and price are required" });
        }
        
        const newMenuItem = await MenuItem.create({ name, description, price, imageUrl });
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ message: "Error creating menu item", error: error.message });
    }
};

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await MenuItem.findAll();
        res.status(200).json(menuItems);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu items", error: error.message });
    }
};

// Get a single menu item by ID
exports.getOneMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findAll({where:{id}});
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        res.status(500).json({ message: "Error fetching menu item", error: error.message });
    }
};

// Update a menu item
exports.editMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, imageUrl } = req.body;

        const menuItem = await MenuItem.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.update({ name, description, price, imageUrl });
        res.status(200).json({ message: "Menu item updated successfully", menuItem });
    } catch (error) {
        res.status(500).json({ message: "Error updating menu item", error: error.message });
    }
};

// Delete a menu item
exports.deleteMenuItem = async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findByPk(id);
        if (!menuItem) {
            return res.status(404).json({ message: "Menu item not found" });
        }

        await menuItem.destroy();
        res.status(200).json({ message: "Menu item deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting menu item", error: error.message });
    }
};
