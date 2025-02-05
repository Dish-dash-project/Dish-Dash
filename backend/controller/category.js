const { Category } = require('../database/models/category'); // Importing the Category model

// Add a new category
exports.addCategory = async (req, res) => {
    try {
        const { name, imageUrl } = req.body;
        if (!name || !imageUrl) {
            return res.status(400).json({ message: "All fields are required" });
        }
        
        const newCategory = await Category.create({ name, imageUrl });
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: "Error creating category", error: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

// Get a single category by ID
exports.getOneCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Error fetching category", error: error.message });
    }
};

// Update a category
exports.editCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, imageUrl } = req.body;

        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.update({ name, imageUrl });
        res.status(200).json({ message: "Category updated successfully", category });
    } catch (error) {
        res.status(500).json({ message: "Error updating category", error: error.message });
    }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        await category.destroy();
        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting category", error: error.message });
    }
};
