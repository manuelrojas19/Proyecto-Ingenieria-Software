const express = require('express');

const AuthController = require('../controllers/auth_controller.js');

const router = new express.Router();

const ROOT_URL = '/api/v1/auth';

router.post(`${ROOT_URL}/signup`, AuthController.signUp);
router.post(`${ROOT_URL}/signin`, AuthController.singIn);
router.get(`${ROOT_URL}/check`, AuthController.check);
router.get(`${ROOT_URL}/logout`, AuthController.logout);

module.exports = router;
