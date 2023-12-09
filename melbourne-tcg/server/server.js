const path = require('path');
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sequelize = require('./config/connections');
const routes = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

// const sess = {
//   secret: 'Super secret secret',
//   cookie: {
//     maxAge: 3 * 60 * 60 * 1000,
//     httpOnly: true,
//     secure: false,
//     sameSite: 'strict', 
//   },
//   resave: false,
//   saveUninitialized: true,
//   store: new SequelizeStore({
//     db: sequelize
//   })
// };

// app.use(session(sess));

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

//synchronizing the Sequelize models with the database
sequelize.sync({ force: false }).then(() => {
    //This line starts the Express.js server
    app.listen(PORT, () => console.log('Now listening on PORT 3001'));
});
