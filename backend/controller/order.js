const { Order, User, Restaurant, Location } = require('../database/connection');

const orderController = {
  // Create a new order
  async createOrder(req, res) {
    try {
      console.log('Creating new order...');
      const { status, totalPrice } = req.body;
      const order = await Order.create({
        status: status || 'PENDING',
        totalPrice
      });
      console.log('Order created successfully:', order.id);
      res.status(201).json(order);
    } catch (error) {
      console.error('Detailed error in createOrder:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ 
        message: 'Error creating order', 
        error: error.message,
        details: error.stack 
      });
    }
  },

  // Get all orders
  async getAllOrders(req, res) {
    try {
      console.log('Fetching all orders...');
      const orders = await Order.findAll({
        include: [
          {
            model: User,
            as: 'customer',
            attributes: ['name', 'email']
          },
          {
            model: Restaurant,
            attributes: ['name']  // Only get restaurant name, remove address
          }
        ],
        attributes: [
          'id', 'status', 'totalPrice', 'createdAt',
          'deliveryAddress', 'latitude', 'longitude'
        ],
        where: {
          status: 'PENDING' // Only fetch pending orders for drivers
        }
      });
      
      console.log('Orders fetched successfully:', orders.length);
      console.log('First order sample:', JSON.stringify(orders[0], null, 2));
      
      const formattedOrders = orders.map(order => {
        const plainOrder = order.get({ plain: true });
        return {
          ...plainOrder,
          customer: plainOrder.customer || { name: 'Unknown', email: 'Unknown' },
          restaurant: plainOrder.restaurant || { name: 'Unknown' }
        };
      });

      res.status(200).json({ data: formattedOrders });
    } catch (error) {
      console.error('Detailed error in getAllOrders:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ 
        message: 'Error fetching orders', 
        error: error.message,
        details: error.stack 
      });
    }
  },

  // Get order by ID
  async getOrderById(req, res) {
    try {
      console.log('Fetching order by ID...');
      const { id } = req.params;
      const order = await Order.findByPk(id);
      if (!order) {
        console.log('Order not found:', id);
        return res.status(404).json({ message: 'Order not found' });
      }
      console.log('Order fetched successfully:', order.id);
      res.status(200).json(order);
    } catch (error) {
      console.error('Detailed error in getOrderById:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ 
        message: 'Error fetching order', 
        error: error.message,
        details: error.stack 
      });
    }
  },

  // Update order status
  async updateOrderStatus(req, res) {
    try {
      console.log('Updating order status...');
      const { id } = req.params;
      const { status } = req.body;
      
      const order = await Order.findByPk(id);
      if (!order) {
        console.log('Order not found:', id);
        return res.status(404).json({ message: 'Order not found' });
      }

      order.status = status;
      await order.save();
      
      console.log('Order status updated successfully:', order.id);
      res.status(200).json(order);
    } catch (error) {
      console.error('Detailed error in updateOrderStatus:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ 
        message: 'Error updating order', 
        error: error.message,
        details: error.stack 
      });
    }
  },

  // Delete order
  async deleteOrder(req, res) {
    try {
      console.log('Deleting order...');
      const { id } = req.params;
      const order = await Order.findByPk(id);
      
      if (!order) {
        console.log('Order not found:', id);
        return res.status(404).json({ message: 'Order not found' });
      }

      await order.destroy();
      console.log('Order deleted successfully:', id);
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Detailed error in deleteOrder:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      res.status(500).json({ 
        message: 'Error deleting order', 
        error: error.message,
        details: error.stack 
      });
    }
  }
};

module.exports = orderController;