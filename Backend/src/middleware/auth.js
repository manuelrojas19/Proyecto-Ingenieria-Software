require('dotenv').config();
const {ACCESS_TOKEN_SECRET} = process.env;
const EmployeeService = require('../services/employee_service.js');

const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not_found_error.js');
const NotAuthenticatedError = require('../errors/not_authenticated_error.js');
const NotAuthorizedError = require('../errors/not_authorized_error.js');

const USER_NOT_AUTHENTICATED_ERROR = 'Not authenticaded, please authenticate';
const USER_NOT_AUTHORIZED_ERROR = 'Forbidden, user is not authorized';
const USER_NOT_FOUND_ERROR = 'User was not found';

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new NotAuthenticatedError(USER_NOT_AUTHENTICATED_ERROR);
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      throw new NotAuthenticatedError(USER_NOT_AUTHENTICATED_ERROR);
    }

    const employee = await EmployeeService.findEmployeeById(
        decodedToken.employeeId);
    if (!employee) {
      throw new NotFoundError(USER_NOT_FOUND_ERROR);
    }
    req.employee = employee;
    next();
  } catch (e) {
    next(e);
  }
};

exports.permit = (...permittedRoles) => {
  return (req, res, next) => {
    const employee = req.employee;
    if (!employee) {
      throw new NotFoundError(USER_NOT_FOUND_ERROR);
    }
    if (!permittedRoles.includes(employee.profile.name)) {
      throw new NotAuthorizedError(USER_NOT_AUTHORIZED_ERROR);
    }
    next();
  };
};
