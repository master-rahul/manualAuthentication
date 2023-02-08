const express = require('express');
const router = express.Router();
const authenticationController = require('../controller/authenticate');
router.get('/',authenticationController.signIn);
router.get('/signUp', authenticationController.signUp);

module.exports = router;