const User = require('../models/User');

const userData = [
    {
        username: 'admin',
        password: 'password'
    },
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser;