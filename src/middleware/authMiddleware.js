const { verifyToken, generateToken } = require('../utils/jwt');
const jwt = require('jsonwebtoken'); // jwt 라이브러리 추가

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token is missing, please login' });
    }

    // 토큰 검증
    const decoded = verifyToken(token);

    if (!decoded) {
        // 만료된 토큰에서 Payload 추출
        const expiredPayload = jwt.decode(token);

        if (!expiredPayload || !expiredPayload.userId) {
            return res.status(401).json({ message: 'Invalid Token, please login again' });
        }

        // 새 토큰 발급
        const newToken = generateToken({ userId: expiredPayload.userId });

        // 쿠키에 새 토큰 저장
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000, // 1시간
        });

        // 새 토큰을 응답 헤더에 추가
        res.setHeader('Authorization', `Bearer ${newToken}`);

        console.log('Token expired, issuing a new one.');
    } else {
        // 유효한 토큰이면 사용자 정보 저장
        req.user = decoded;
    }

    next();
};

module.exports = { authMiddleware };