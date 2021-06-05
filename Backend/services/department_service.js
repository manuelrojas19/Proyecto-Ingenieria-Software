const {Department} = require('../models/index.js');

exports.findAllDepartments = async () => {
  return Department.findAll();
};

