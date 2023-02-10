const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.get('/sign-out', userController.signOut);
router.get('/profile', userController.profile);
router.post('/add', userController.add);
router.post('/authenticate', userController.autheticate);

module.exports = router;