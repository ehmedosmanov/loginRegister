import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, 'mySecretKey123', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = user;
        next();
    });
};