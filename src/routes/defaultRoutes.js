const express = require('express');
const { login, logout } = require('../controllers/defaultController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Express server API is running...');
});

router.post('/login', express.urlencoded({ extended: true}), login);
router.get('/logout', logout);
// router.get('/new-accss-token', new_token);

module.exports = router;