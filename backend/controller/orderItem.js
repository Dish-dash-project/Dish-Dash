const { OrderItem, MenuItem } = require('../database/connection');

const orderItemController = {
    // Create new order item
    create: async (req, res) => {
        try {
            const { menuItemId, quantity, price } = req.body;
            // Get product price
            const product = await MenuItem.findByPk(menuItemId);
            if (!product) {

                return res.status(404).json({ message: 'Product not found' });
            }

            const orderItem = await OrderItem.create({
                MenuItemId:menuItemId,
                quantity,
                price: price
            });


            res.status(201).json(orderItem);
        } catch (error) {
            res.status(500).json({ message: 'Error creating order item', error: error.message });
        }
    },

    // Update order item quantity
    update: async (req, res) => {
        try {
            const { id } = req.params;
            const { quantity } = req.body;

            const orderItem = await OrderItem.findByPk(id);
            if (!orderItem) {
                return res.status(404).json({ message: 'Order item not found' });
            }

            if (quantity < 0) {
                return res.status(400).json({ message: 'Quantity cannot be negative' });
            }

            if (quantity === 0) {
                await orderItem.destroy();
                return res.status(200).json({ message: 'Order item removed' });
            }

            await orderItem.update({ quantity });
            res.status(200).json(orderItem);
        } catch (error) {
            res.status(500).json({ message: 'Error updating order item', error: error.message });
        }
    },

    // Delete order item
    delete: async (req, res) => {
        try {
            const { id } = req.params;
            
            const orderItem = await OrderItem.findByPk(id);
            if (!orderItem) {
                return res.status(404).json({ message: 'Order item not found' });
            }

            await orderItem.destroy();
            res.status(200).json({ message: 'Order item deleted successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error deleting order item', error: error.message });
        }
    },

    // Get all items for a specific order
    getByOrderId: async (req, res) => {
        try {
            const { orderId } = req.params;
            
            const orderItems = await OrderItem.findAll({
                where: { orderId },
                include: [{ model: Product }]
            });

            res.status(200).json(orderItems);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching order items', error: error.message });
        }
    },

        getAll: async (req, res) => {
            try {           
                const orderItems = await OrderItem.findAll({
                    include: [{
                        model: MenuItem,
                        attributes: ['name', 'imageUrl']
                    }],
                    attributes: ['id', 'quantity', 'price', 'menuItemId']
                });
                
                res.status(200).send(orderItems);
            } catch (error) {
                console.error('Error:', error);
                res.status(500).json({ 
                    message: 'Error fetching order items', 
                    error: error.message 
                });
            }
        }
    
};

module.exports = orderItemController;