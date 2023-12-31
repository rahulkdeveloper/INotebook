const express = require('express');
const router = express.Router();
const { loadProfile } = require('../controller/user');
const { auth } = require('../middleware/auth');

router.get('/load-profile', auth, loadProfile)

module.exports = router