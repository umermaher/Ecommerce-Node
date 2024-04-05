const express = require('express');
const {signUp} = require('../controllers/users.controller.js');
const router = express.Router();

router.post('/signup', signUp);

module.exports = router;