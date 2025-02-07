const { Op } = require('sequelize');
const { MenuItem } = require('../database/connection');

exports.advancedSearch = async (req, res) => {
    try {
        const { menuName, categoryId } = req.query;
        
        const whereClause = {
            [Op.and]: [] // Initialize with an AND condition
        };
        
        // Check if menuName is provided
        if (menuName) {
            whereClause[Op.and].push({
                name: { [Op.like]: `%${menuName}%` } // Use LIKE for MySQL
            });
        }
        
        // Check if categoryId is provided
        if (categoryId) {
            whereClause[Op.and].push({
                categoryId: categoryId
            });
        }

        // If no filters are provided, return all items
        if (whereClause[Op.and].length === 0) {
            delete whereClause[Op.and]; // Remove the AND condition if no filters
        }

        const results = await MenuItem.findAll({
            where: whereClause,
            order: [['name', 'ASC']] // Optional: Sort by menu name
        });

        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ 
            message: "Error performing advanced search", 
            error: error.message 
        });
    }
};