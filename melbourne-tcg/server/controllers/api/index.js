const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');
const orderRoutes = require('./orderRoutes');
const userRoutes = require('./userRoutes');

router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/orders', orderRoutes);
router.use('/users', userRoutes);

module.exports = router;