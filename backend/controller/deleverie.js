const db = require('../database/connection');

// Create a new delivery
exports.createDelivery = async (req, res) => {
    try {
        console.log('Creating delivery with data:', req.body);
        
        const { orderId, driverId, status } = req.body;

        // Validate required fields
        if (!orderId || !driverId) {
            return res.status(400).json({
                success: false,
                error: 'Order ID and Driver ID are required'
            });
        }

        // Check if order exists and get its details
        const order = await db.Order.findByPk(orderId, {
            include: [{
                model: db.Restaurant,
                attributes: ['latitude', 'longitude', 'address']
            }]
        });
        
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found'
            });
        }

        // Check if driver exists
        const driver = await db.User.findByPk(driverId);
        if (!driver) {
            return res.status(404).json({
                success: false,
                error: 'Driver not found'
            });
        }

        // Create the delivery with minimal data first
        const delivery = await db.Delivery.create({
            orderId,
            driverId,
            status: status || 'DRIVER_ASSIGNED',
            pickupLocation: order.Restaurant ? JSON.stringify({
                lat: order.Restaurant.latitude || 0,
                lng: order.Restaurant.longitude || 0,
                address: order.Restaurant.address || ''
            }) : null,
            deliveryLocation: JSON.stringify({
                lat: order.latitude || 0,
                lng: order.longitude || 0,
                address: order.deliveryAddress || ''
            }),
            currentLocation: null
        });

        // Update order status
        await order.update({ status: 'DRIVER_ASSIGNED' });
        
        console.log('Delivery created successfully:', delivery.id);
        
        res.status(201).json({
            success: true,
            data: delivery
        });
    } catch (error) {
        console.error('Error creating delivery:', error);
        res.status(400).json({
            success: false,
            error: error.message,
            details: error.stack
        });
    }
};

// Get delivery by ID
exports.getDelivery = async (req, res) => {
    try {
        const delivery = await db.Delivery.findByPk(req.params.id, {
            include: [
                {
                    model: db.User,
                    as: 'driver',
                    attributes: ['id', 'name', 'phone', 'imageUrl']
                },
                {
                    model: db.Order,
                    include: [
                        {
                            model: db.User,
                            as: 'customer',
                            attributes: ['id', 'name', 'phone']
                        },
                        {
                            model: db.Restaurant,
                            attributes: ['id', 'name', 'phone']
                        }
                    ]
                }
            ]
        });

        if (!delivery) {
            return res.status(404).json({
                success: false,
                error: 'Delivery not found'
            });
        }

        res.status(200).json({
            success: true,
            data: delivery
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Update delivery status
exports.updateDeliveryStatus = async (req, res) => {
    try {
        const { status, currentLocation } = req.body;
        const delivery = await db.Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(404).json({
                success: false,
                error: 'Delivery not found'
            });
        }

        // Update status timestamps based on status
        const updates = {
            status,
            currentLocation
        };

        switch (status) {
            case 'PICKED_UP':
                updates.actualPickupTime = new Date();
                break;
            case 'DELIVERED':
                updates.actualDeliveryTime = new Date();
                break;
        }

        const updatedDelivery = await delivery.update(updates);

        res.status(200).json({
            success: true,
            data: updatedDelivery
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};

// Get active deliveries for a driver
exports.getDriverDeliveries = async (req, res) => {
    try {
        const deliveries = await db.Delivery.findAll({
            where: {
                driverId: req.params.driverId,
                status: {
                    [db.Sequelize.Op.notIn]: ['DELIVERED', 'FAILED', 'CANCELLED']
                }
            },
            include: [
                {
                    model: db.Order,
                    include: [
                        {
                            model: db.User,
                            as: 'customer',
                            attributes: ['id', 'name', 'phone']
                        },
                        {
                            model: db.Restaurant,
                            attributes: ['id', 'name', 'phone']
                        }
                    ]
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json({
            success: true,
            data: deliveries
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

// Get all orders (test endpoint)
exports.getAllOrders = async (req, res) => {
    try {
        console.log('Fetching all orders...');
        const orders = await db.Order.findAll({
            include: [
                {
                    model: db.User,
                    as: 'customer',
                    attributes: ['id', 'name', 'phone']
                },
                {
                    model: db.Restaurant,
                    attributes: ['id', 'name', 'address']
                }
            ]
        });

        console.log('All orders:', {
            count: orders.length,
            statuses: orders.map(order => order.status),
            driverIds: orders.map(order => order.driverId)
        });

        res.status(200).json({
            success: true,
            data: orders || []
        });
    } catch (error) {
        console.error('Error in getAllOrders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch orders',
            details: error.message
        });
    }
};

// Get available orders (orders without a driver assigned)
exports.getAvailableOrders = async (req, res) => {
    try {
        console.log('Starting getAvailableOrders...');
        
        // Find orders that are either PAID or CONFIRMED but not assigned to a driver
        const orders = await db.Order.findAll({
            where: {
                status: ['PAID', 'CONFIRMED'], // Orders ready for driver pickup
                driverId: null
            },
            include: [
                {
                    model: db.User,
                    as: 'customer',
                    attributes: ['id', 'name', 'phone']
                },
                {
                    model: db.Restaurant,
                    attributes: ['id', 'name', 'address']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        console.log(`Found ${orders.length} available orders`);

        res.status(200).json({
            success: true,
            data: orders || []
        });
    } catch (error) {
        console.error('Error in getAvailableOrders:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to fetch available orders',
            details: error.message
        });
    }
};

// Complete delivery
exports.completeDelivery = async (req, res) => {
    try {
        const { proofOfDelivery, customerSignature, rating } = req.body;
        const delivery = await db.Delivery.findByPk(req.params.id);

        if (!delivery) {
            return res.status(404).json({
                success: false,
                error: 'Delivery not found'
            });
        }

        const updatedDelivery = await delivery.update({
            status: 'DELIVERED',
            actualDeliveryTime: new Date(),
            proofOfDelivery,
            customerSignature,
            rating
        });

        res.status(200).json({
            success: true,
            data: updatedDelivery
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};