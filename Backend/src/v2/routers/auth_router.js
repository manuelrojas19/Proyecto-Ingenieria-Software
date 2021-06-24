const express = require('express');
const {AuthController} = require('../controllers/index.js');

const router = new express.Router();

router.get('check', AuthController.check);
router.post('/signup', AuthController.signUp);
router.post('/signin', AuthController.singIn);
router.get('/logout', AuthController.logout);

module.exports = router;
