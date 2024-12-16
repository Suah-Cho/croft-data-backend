const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const defaultRoutes = require('./src/routes/defaultRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', defaultRoutes);

app.use('/api/users', userRoutes);

app.listen(PORT, function() {
    console.log('Express server on port 3000!!')
});