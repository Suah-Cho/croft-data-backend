const express = require('express');
const router = express.Router();
const { getAllAbleUsers, deleteUser, createUser } = require('../controllers/userController');

router.get('/all', getAllAbleUsers);
router.delete('/deactivate', deleteUser);
router.post('/register', createUser)

module.exports = router;

