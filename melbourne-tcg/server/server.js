const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connections');
const routes = require('./controllers');
const userRoutes = require('./controllers/api/userRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);
app.use('/api/users', userRoutes.router);

//synchronizing the Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
   // Call the function when the server starts
    // userRoutes.createDefaultUser();

    //This line starts the Express.js server
    app.listen(PORT, () => console.log('Now listening on PORT 3001'));
});
