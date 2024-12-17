
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const user = require('../../models/users');
const connection = require('../../config/db_utils');
const { generateToken, refreshToken } = require('../utils/jwt');

const login = async (req, res) => {
    // email & password
    const { username, password } = req.body;

    try {
        const result = await user.findOne({
            where: { email: username },
            attributes: ['id', 'password']
        });

        bcrypt.compare(password, result['password'], (error, isMatch) => {
            if (error) {
                console.error('Wrong Password');
                res.status(404).json({
                    message: 'Password Wrong',
                })
                return;
            }
            if (isMatch) {
                const token = generateToken({
                    username: username,
                    user_id: result['id']
                })

                console.log('Password match!');
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
                // res.cookie('token', token, { maxAge: 3600000 });
                res.status(200).json({
                    message: 'Login Success',
                    user_id: result['id'],
                    token: token
                })
            } else {
                console.error('Wrong Password');
                res.status(404).json({
                    message: 'Password Wrong',
                })
            }
        })
    } catch (error) {
        console.error(error);
    }
};

const logout = async (req, res) => {
    try {
        console.log(req.cookies);

        const token = req.cookies.token;

        if (!token) {
            res.status(401).json({
                message: 'Token not found, Please Login'
            });
            return;
        }

        const decoded = jwt.decode(token);

        if (!decoded) {
            res.status(401).json({
                message: 'Invalid Token, Check login status'
            });
            return;
        }

        res.clearCookie('token');
        res.status(200).json({
            message: 'Logout Success'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error',
            error: error.message
        });
    }
    
};

module.exports = { login, logout };