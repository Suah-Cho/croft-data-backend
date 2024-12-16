const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    return token;
}

const refreshToken = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);

        const payload = {
            username: decoded.username,
            user_id: decoded.user_id
        };

        const newToken = generateToken(payload);
        return newToken;
    } catch (error) {
        console.error('Error refreshing token: ', error);
        return null;
    }
}

module.exports = { generateToken, refreshToken };

// https://velog.io/@hoonnn/NodeJS-JWT%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0