const Item = require('./Item');
const Category = require('./Category');

//Item belongs to Category
Item.belongsTo(Category, {
    foreignKey: 'category_id',
});

//Category has many Items
Category.hasMany(Item,  {
    foreignKey: 'category_id',
});

module.exports = {
    Item,
    Category,
};
