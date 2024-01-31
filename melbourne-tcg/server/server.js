// const path = require('path');
// const express = require('express');

// const sequelize = require('./config/connections');
// const routes = require('./controllers');
// // const userRoutes = require('./controllers/api/userRoutes');

// const app = express();
// const PORT = process.env.PORT || 3001;

// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, 'public')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build/index.html'));
// });

// app.use(routes);
// // app.use('/api/users', userRoutes.router);

// //synchronizing the Sequelize models with the database
// sequelize.sync({ force: false }).then(() => {
//    // Call the function when the server starts
//   //  userRoutes.createDefaultUser();

//     //This line starts the Express.js server
//     app.listen(PORT, () => console.log('Now listening on PORT 3001'));
// });

const path = require('path');
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const sequelize = require('./config/connections');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors()); // Enable CORS for all routes

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
});
