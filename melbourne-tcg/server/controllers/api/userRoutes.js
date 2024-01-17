const router = require('express').Router();
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../../models/User');
const { signToken } = require('../../utils/authUtil');

//Endpoint '/api/users'

//create an account
router.post('/signup', async (req, res) => {
  try {
    const userData = await User.create({
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
    });

    res.status(200).json(userData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// const createDefaultUser = async () => {
//     try {
//         const existingUser = await User.findOne({ where: { username: "admin2" } });

//         if (!existingUser) {
//             const userData = await User.create({
//                 username: "admin2",
//                 password: "adminpassword",
//             });

//             console.log('Default user created:', userData);
//         } else {
//             console.log('Default user already exists');
//         }
//     } catch (err) {
//         console.error('Error creating default user:', err);
//     }
// };

// login the user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { username: req.body.username} });

        if (!userData) {
            res
            .status(400)
            .json({ message: 'Incorrect username or password, please try again' });
            return;
        }

        const password = req.body.password;

        if (!bcrypt.compareSync(password, userData.password)) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = signToken({
            username: userData.username,
            _id: userData.id,
        });

        res.json({ token });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();
        res.status(200).json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// module.exports = { router, createDefaultUser };
module.exports = router;