const { verifyToken, generateToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken'); // jwt 라이브러리 추가

const authenticate = (req, res, next) => {
    const accessToken = req.headers('Authorization')?.replace('Bearer ', '');

    if (!accessToken) {
        return res.status(401).json({
            message: 'Access Token Required',
        })
    }

    try {
        req.user = jwt.verify(accessToken, process.env.JWT_SECRET_KEY); //user
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Invalid or expired Access Token'
        })
    }
};

module.exports = { authenticate };