require('dotenv').config();
const {ACCESS_TOKEN_SECRET, ACCESS_TOKEN_LIFE, NODE_ENV} = process.env;
const jwt = require('jsonwebtoken');
const {logger} = require('../../../util/logger.js');
const cookieConfig = require('../../../config/cookie_config')[NODE_ENV];
const {EmployeeService} = require('../services/index.js');

const USER_LOGGED_ERROR = 'No user logged in, please log in.';
const TOKEN_INVALID_ERROR = 'Token is not valid, please log in.';
const USER_LOGIN_MESSAGE = 'User logged in succesfuly.';
const USER_SIGNUP_MESSAGE = 'User sign up succesfuly.';
const USER_LOGOUT_MESSAGE = 'User logged out succesfuly.';
const USER_IS_LOGGEDIN = 'User authenticated and logged in';

exports.singIn = async (req, res) => {
  const {email, password} = req.body;

  try {
    const employee = await EmployeeService.findEmployeeByCredentials({
      email,
      password,
    });

    const token = jwt.sign(
        {
          employeeId: employee.id.toString(),
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_LIFE,
        },
    );
    logger.info(employee.toJSON(), USER_LOGIN_MESSAGE);
    res
        .status(200)
        .cookie('token', token, cookieConfig)
        .json({message: USER_LOGIN_MESSAGE, employee: employee.toJSON()});
  } catch (e) {
    logger.error(e);
    res.status(500).json({error: e.message});
  }
};

exports.signUp = async (req, res) => {
  const params = Object.keys(req.body);
  const allowParams = [
    'name',
    'lastName',
    'phoneNumber',
    'email',
    'password',
    'profile',
    'department',
  ];

  const isValid = params.every((update) => allowParams.includes(update));
  if (!isValid) {
    return res.status(400).send({error: 'Invalid params'});
  }

  const employeData = req.body;

  try {
    const employee = await EmployeeService.createEmployee(employeData);

    const token = jwt.sign(
        {
          employeeId: employee.id.toString(),
        },
        ACCESS_TOKEN_SECRET,
        {
          expiresIn: ACCESS_TOKEN_LIFE,
        },
    );

    logger.info(employee.toJSON(), USER_SIGNUP_MESSAGE);

    res.status(200).cookie('token', token, cookieConfig).json({
      message: USER_SIGNUP_MESSAGE,
      employee: employee.toJSON(),
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({error: e.message});
  }
};

exports.logout = async (req, res) => {
  try {
    res
        .status(200)
        .clearCookie('token', cookieConfig)
        .json({message: USER_LOGOUT_MESSAGE});
  } catch (e) {
    logger.error(e);
    res.status(500).json({error: e.message});
  }
};

exports.check = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(202).json({
        authenticated: false,
        message: USER_LOGGED_ERROR,
      });
    }

    const decodedToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    if (!decodedToken) {
      return res.status(202).json({
        authenticated: false,
        message: TOKEN_INVALID_ERROR,
      });
    }

    const employee = await EmployeeService.findEmployeeById(
        decodedToken.employeeId,
    );
    if (!employee) {
      return res.status(202).json({
        authenticated: false,
        message: USER_LOGGED_ERROR,
      });
    }
    res.status(200).json({
      authenticated: true,
      message: USER_IS_LOGGEDIN,
      employee: employee,
    });
  } catch (e) {
    logger.error(e);
    res.status(500).json({
      authenticated: false,
      error: e.message,
    });
  }
};
