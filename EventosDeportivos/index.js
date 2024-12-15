const express = require('express');
require('dotenv').config();

const connectDB = require('./src/utils/db');
const router = require('./src/api/routers/routes');
connectDB();

const server = express();

server.use(express.json());

server.use('/api', router);

server.listen(process.env.PORT, () => {
    console.log(`server running port http://localhost:${process.env.PORT}`);
});