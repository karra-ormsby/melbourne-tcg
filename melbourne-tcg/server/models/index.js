const Item = require('./Item');
const Category = require('./Category');
const Order = require('./Order');
const OrderItem = require('./OrderItem');

//Item belongs to Category
Item.belongsTo(Category, {
    foreignKey: 'category_id',
});

//Category has many Items
Category.hasMany(Item,  {
    foreignKey: 'category_id',
});

// Many-to-Many relationship between Order and Item
Order.belongsToMany(Item, {
  // Define the third table needed to store the foreign keys
  through: {
    model: OrderItem,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'order_items'
});

Item.belongsToMany(Order, {
  // Define the third table needed to store the foreign keys
  through: {
    model: OrderItem,
    unique: false
  },
  // Define an alias for when data is retrieved
  as: 'items_ordered'
});

module.exports = {
    Item,
    Category,
    Order,
    OrderItem
};