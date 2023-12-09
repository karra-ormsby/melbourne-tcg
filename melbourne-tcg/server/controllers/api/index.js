const router = require('express').Router();
const categoryRoutes = require('./categoryRoutes');
const itemRoutes = require('./itemRoutes');

router.use('/categories', categoryRoutes);
router.use('/items', itemRoutes);

module.exports = router;
