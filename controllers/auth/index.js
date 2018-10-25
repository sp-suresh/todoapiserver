const express = require("express");
const router = express.Router();
const auth = require('./authHandler');
const {verifyToken} = require('../../middlewares/authMiddleware');

router.post('/login', auth.login);
// router.post('/logout', verifyToken, auth.logout);

module.exports = router;
