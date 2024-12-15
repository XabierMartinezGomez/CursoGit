const express = require('express');
const router = express.Router();

router.use('/user', require('./apiRoutes/userRoutes'));
router.use('/event', require('./apiRoutes/eventRoutes'));

module.exports = router;