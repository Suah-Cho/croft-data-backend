const express = require('express');

const router = express.Router();

// 기본 라우트
router.get('/', (req, res) => {
    res.status(200).send('Express server API is running...');
});

module.exports = router; // 라우터 내보내기