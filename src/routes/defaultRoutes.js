const express = require('express');
const { login } = require('../controllers/defaultController');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('Express server API is running...');
});

router.post('/login', login);

module.exports = router;