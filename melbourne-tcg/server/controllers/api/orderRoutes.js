const router = require('express').Router();
const { Item, Order, OrderItem } = require('../../models');

// Endpoint '/api/orders'

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orderData = await Order.findAll({
            include: [
                {
                    model: Item,
                    through: OrderItem,
                    as: 'order_items',
                },
            ],
        });
        res.status(200).json(orderData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Create a new order
router.post('/', async (req, res) => {
  try {
    const order = await Order.create(req.body);

    // if there's order items, we need to create pairings to bulk create in the OrderItem model
    if (req.body.itemIds.length) {
      const orderItemsIdArr = req.body.itemIds.map((item_id) => ({
        order_id: order.id,
        item_id: item_id,
      }));

      await OrderItem.bulkCreate(orderItemsIdArr, { fields: ['order_id', 'item_id'] });
    }

    // Fetch the order again to include item details
    const orderWithItems = await Order.findByPk(order.id, {
      include: [{ model: Item, as: 'order_items' }]
    });

    res.status(200).json(orderWithItems);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});


module.exports = router;

