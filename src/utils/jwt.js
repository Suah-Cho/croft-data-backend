// const jwt = require('jsonwebtoken');
//
// const secretKey = process.env.JWT_SECRET_KEY;
// const expiresIn = '1h';
//
// const generateToken = (payload) => {
//     const token = jwt.sign(payload, secretKey, { expiresIn: expiresIn });
//
//     return token;
// }
//
// const verifyToken = (token) => {
//     try {
//         return jwt.verify(token, secretKey);
//     } catch (error) {
//         return null;
//     }
// }
//
// const refreshToken = (token) => {
//     try {
//         const decoded = jwt.verify(token, secretKey);
//
//         const payload = {
//             username: decoded.username,
//             user_id: decoded.user_id
//         };
//
//         const newToken = generateToken(payload);
//         return newToken;
//     } catch (error) {
//         console.error('Error refreshing token: ', error);
//         return null;
//     }
// }
//
// module.exports = { generateToken, refreshToken, verifyToken };
//
// // https://velog.io/@hoonnn/NodeJS-JWT%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0