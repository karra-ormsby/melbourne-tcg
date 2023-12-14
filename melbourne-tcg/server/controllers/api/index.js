const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');
const userRoutes = require('./userRoutes');

router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);
router.use('/users', userRoutes);

module.exports = router;