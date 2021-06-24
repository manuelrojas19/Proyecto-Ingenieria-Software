require('dotenv').config();
const {ACCESS_TOKEN_SECRET} = process.env;
const EmployeeService = require('../services/employee_service.js');

const jwt = require('jsonwebtoken');
const {logger} = require('../../../util/logger.js');

const USER_NOT_AUTHENTICATED_ERROR = 'Not authenticaded, please authenticate';
const USER_NOT_AUTHORIZED_ERROR = 'Forbidden, user is not authorized';
const USER_NOT_FOUND_ERROR = 'User was not found';

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error(USER_NOT_AUTHENTICATED_ERROR);
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new Error(USER_NOT_AUTHENTICATED_ERROR);
    }
    const employee = await EmployeeService.findEmployeeById(
        decodedToken.employeeId);
    if (!employee) {
      throw new Error(USER_NOT_FOUND_ERROR);
    }
    req.employee = employee;
    next();
  } catch (e) {
    logger.error(e);
    res.status(500).json({error: e.message});
  }
};

exports.permit = (...permittedRoles) => {
  return (req, res, next) => {
    const {employee} = req;
    if (!employee) {
      throw new Error();
    }
    if (permittedRoles.includes(employee.profile.name)) {
      next();
    } else {
      res.status(403).json({message: USER_NOT_AUTHORIZED_ERROR});
    }
  };
};
