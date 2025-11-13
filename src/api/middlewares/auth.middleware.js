// Mock authentication middleware for testing
// TODO: Replace with actual JWT verification when authentication is implemented

const mockAuth = (req, res, next) => {
    // For testing: extract user ID from header or use default
    const userId = req.headers['x-user-id'];
    
    if (!userId) {
        return res.status(401).json({ 
            error: 'Authentication required. Please provide x-user-id header.' 
        });
    }
    
    // Simulate JWT decoded payload
    req.user = {
        id: parseInt(userId)
    };
    
    next();
};

module.exports = mockAuth;

/* 
// Real JWT authentication (use this when JWT is implemented)
const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Bearer TOKEN

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token' });
    }
};

module.exports = authenticateJWT;
*/