
const bcrypt = require('bcrypt');

const user = require('../../models/users');
const connection = require('../../config/db_utils');

const secretKey = process.env.JWT_SECRET_KEY;



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

module.exports = { login };