const express = require('express');
const router = express.Router();
const {add, logIn, profile} = require("../../controllers/userController");
const {checkToken} = require("../../middelware/auth");

router.post('/register', add);
router.get('/logIn', logIn);
router.get('/profile', checkToken, profile);

module.exports = router;