const express = require("express");
const router = express.Router();
const auth = require('./authHandler');
const {verifyCookie} = require('../../middlewares/authMiddleware');

router.post('/login', auth.login);
router.post('/logout', verifyCookie, auth.logout);

module.exports = router;
