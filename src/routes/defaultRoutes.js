const express = require('express');
const { login, logout } = require('../controllers/defaultController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Express server API is running...');
});

router.post('/login', login);
router.get('/logout', authMiddleware, logout);

module.exports = router;