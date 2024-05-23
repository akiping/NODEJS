// middleware/authenticate.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const tokenWithoutBearer = token.split(' ')[1];

    try {
        // Verify token
        const decodedToken = jwt.verify(tokenWithoutBearer, 'epiphany');

        // Example: Verify token against stored tokens in memory or database
        // Your validation code here

        // If token is valid, attach the decoded token to the request object
        req.user = decodedToken;
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authenticate;
