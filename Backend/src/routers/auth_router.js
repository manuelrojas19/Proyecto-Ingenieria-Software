const express = require('express');
const {AuthController} = require('../controllers');

const router = new express.Router();

const ROOT_URL = '/auth';

router.post(`${ROOT_URL}/signup`, AuthController.signUp);
router.post(`${ROOT_URL}/signin`, AuthController.singIn);
router.get(`${ROOT_URL}/check`, AuthController.check);
router.get(`${ROOT_URL}/signout`, AuthController.signOut);

module.exports = router;
