const seedUser = require('./user_seed.js');

const sequelize = require('../config/connections.js');

const seedAll = async () => {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    await seedUser();
    console.log('\n----- USERS SEEDED -----\n');
    process.exit(0);
};

seedAll();