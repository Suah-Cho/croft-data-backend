
const user = require('../../models/users');
const connection = require('../../config/db_utils');

const getAllAbleUsers = async (req, res) => {
    try {
        const results = await user.findAll({
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

module.exports = { getAllAbleUsers };
