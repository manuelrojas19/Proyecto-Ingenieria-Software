const express = require('express');

const {AuthController} = require('../controllers/index.js');

const router = new express.Router();

const ROOT_URL = '/auth';
const URL_PATH_V2 = '/api/v2/auth';

router.post(`${ROOT_URL}/signup`, AuthController.signUp);
router.post(`${ROOT_URL}/signin`, AuthController.singIn);
router.get(`${ROOT_URL}/check`, AuthController.check);
router.get(`${ROOT_URL}/logout`, AuthController.logout);

router.post(`${URL_PATH_V2}/signup`, AuthController.signUp);
router.post(`${URL_PATH_V2}/signin`, AuthController.singIn);
router.get(`${URL_PATH_V2}/check`, AuthController.check);
router.get(`${URL_PATH_V2}/logout`, AuthController.logout);

module.exports = router;
