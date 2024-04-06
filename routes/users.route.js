const express = require('express');
const { signUp, signIn, updateUser, updateUserPassword } = require('../controllers/users.controller.js');
const router = express.Router();
const userAuthentication = require("../middlewares/authentication.js");

router.post('/signin', signIn);
router.post('/signup', signUp);
router.post('/update', userAuthentication, updateUser);
router.post('/update_password', userAuthentication, updateUserPassword);

module.exports = router;