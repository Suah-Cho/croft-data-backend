const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const userRoutes = require('./src/routes/userRoutes');
const defaultRoutes = require('./src/routes/defaultRoutes');
const authMiddleware = require('./src/middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// app.use('/api', authMiddleware);

app.use('/api', defaultRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, function() {
    console.log('Express server on port 3000!!')
});