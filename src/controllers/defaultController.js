
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const users = require('../../models/users');
const tokens = require('../../models/tokens');
const connection = require('../../config/db_utils');


const sessions = {};

const login = async (req, res) => {

    const { username, password, deviceType } = req.body;

    try {
        const result = await users.findOne({
            where: { email: username },
            attributes: ['id', 'password']
        });

        // user 확인
        if (!result) {
            return res.status(401).send('User Not Found');
        }

        if (bcrypt.compare(password, result.password)) {
            console.log('Passwords match');

            const { accessToken, refreshToken } = await generateToken(result.id, username, deviceType);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 14 * 24 * 60 * 60 * 1000,
            });
            return res.status(200).json({
                message: 'Login success',
                accessToken: accessToken
            })

        } else {
            console.log('Wrong Password');
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            "message" : "Something went wrong",
            "error": error
        });
    }
};

const generateToken = async (userId, email, deviceType) => {

    /*
        userId, email, deviceType 사용 (from req)
        access token 만료 기준 : 1시간
        refresh token 만료 기준 : 14일
    */

    const accessToken = jwt.sign({
        userId: userId,
        email: email,
        deviceType: deviceType,
        date: Date.now(),
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

    const refreshToken = jwt.sign({
        userId: userId,
        email: email,
        deviceType: deviceType,
        date: Date.now(),
    }, process.env.JWT_REFRESH_SECRET_KEY);

    // refresh token 저장 및 만료 시간 설정
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 14); // 14일 후 만료
    console.log('Expires at', expiresAt);

    // 기존 토큰 조회
    const existingToken = await tokens.findOne({
        where: { user_id: userId, device_type: deviceType }
    })

    if (existingToken) {
        await tokens.update(
            {
                refresh_token: refreshToken,
                updatedAt: expiresAt
            },
            {
                where: { user_id: userId, device_type: deviceType }
            }
        )
    } else {
        await tokens.upsert(
            {
                user_id: userId,
                device_type: deviceType,
                refresh_token: refreshToken,
                updatedAt: expiresAt
            },
            {
                where: {
                    user_id: userId,
                    device_type: deviceType
                }
            }
        )
    }

    return { access_token: accessToken, refresh_token: refreshToken };
}

const logout = async (req, res) => {
    try {

        const refreshToken = req.cookies.refreshToken;

        try {
            if (! refreshToken ) return res.status(401).send('Refresh token not found');

            // refresh 토큰 삭제
            await tokens.destroy({
                where: {
                    refreshToken: refreshToken
                }
            });

            // 쿠키에서 refresh token 삭제
            res.clearCookie('refreshToken', {
                httpOnly: true,
                sameSite: 'Strict',
            });

            return res.status(200).json({
                message: 'Logout success'
            })
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: 'Unauthorized',
            error: error
        })
    }
};

module.exports = { login, logout };