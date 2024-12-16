const express = require('express');
const router = express.Router();
const { getAllAbleUsers } = require('../controllers/userController');

router.get('/all', getAllAbleUsers)


module.exports = router;

