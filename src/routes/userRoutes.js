const express = require('express');
const router = express.Router();
const { getAllAbleUsers, deleteUser, createUser } = require('../controllers/userController');
const { authenticate } = require('../middleware/authMiddleware');

router.get('/all', getAllAbleUsers);
router.delete('/deactivate', authenticate, deleteUser);
router.post('/register', createUser);

module.exports = router;

