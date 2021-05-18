const express = require('express');

const AuthController = require('../controllers/auth_controller.js');

const router = new express.Router();

const ROOT_PATH = '/api/v1/auth';

router.post(ROOT_PATH + '/signup', AuthController.signUp);
router.post(ROOT_PATH + '/signin', AuthController.singIn);
router.get(ROOT_PATH + '/check', AuthController.check);
router.get(ROOT_PATH + '/logout', AuthController.logout);

module.exports = router;
