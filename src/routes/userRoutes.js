const express = require('express');
const router = express.Router();
const { getAllAbleUsers, deleteUser, createUser } = require('../controllers/userController');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/all', getAllAbleUsers);
router.delete('/deactivate', authMiddleware, deleteUser);
router.post('/register', createUser);

module.exports = router;

