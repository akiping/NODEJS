// controllers/userController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT
const User = require('../models/user');

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findByUsername(username);

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate a bearer token dynamically
        const token = jwt.sign({ userId: user.id, username: user.username }, 'epiphany', { expiresIn: '1h' });

        res.status(200).json({ token }); // Return the token
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
