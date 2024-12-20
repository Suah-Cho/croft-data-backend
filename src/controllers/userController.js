
const users = require('../../models/users');
const bcrypt = require('bcrypt');
const { Op } = require('sequelize');
const { generateToken, refreshToken } = require('../utils/jwt');

// 모든 사용자 조회
const getAllAbleUsers = async (req, res) => {
    try {
        const results = await users.findAll({
            where: {validation: true},
            attributes: ['id', 'user_name', 'email']
        });
        if (results) {
            res.status(200).json(results);
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Database error',
            error: error.message
        })
    }
}

// 회원가입
const createUser = async (req, res) => {
    try {
        const { email, password, user_name, phone_number } = req.body;

        try {
            const result = await users.findOne({
                where: {
                    [Op.or]: [
                        { email: email },
                        { phone_number: phone_number }
                    ]
                }
            });

            if (result) {
                res.status(400).json({
                    message: 'Email or phone number already exists.'
                })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);

                const newUser = await users.create({
                    email,
                    password: hashedPassword,
                    user_name,
                    phone_number
                });

                res.status(201).json({
                    message: 'User registered succesfully',
                    user: newUser
                })
            };
        } catch (error) {
            console.error(error);
            res.status(500).json({
                message: 'create user failed (varify the email and phone)',
                error: error.message
            })
        }

        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'create user failed',
            error: error.message
        })
    }
};

const getUserID = async (email) => {
    try {
        const user_id = await users.findOne({
            where: {email: email}
        })
        return user_id.id;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const deleteUser = async (req, res) => {

    try {
        const email = req.user.username;
        // const userId = await getUserID(email);

        const result = await users.update(
            {validation: false},
            {where: {email: email}}
        );

        if (result[0] === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.status(200).json({
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'User delete failed',
            error: error.message
        })
    }
}

module.exports = { getAllAbleUsers, deleteUser, createUser };
