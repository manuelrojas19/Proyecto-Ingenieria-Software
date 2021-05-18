const express = require('express');
const {verifyToken, permit} = require('../middleware/auth');
const router = new express.Router();

const ROOT_PATH = '/api/v1';

router.get(
    ROOT_PATH + '/employee/me',
    verifyToken,
    permit('Empleado'),
    (req, res) => {
      res.status(200).json({employee: req.employee});
    },
);

module.exports = router;
