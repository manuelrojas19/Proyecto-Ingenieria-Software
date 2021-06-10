const {EmployeeService} = require('../services/employee_service');

exports.me = async (req, res) => {
  res.status(200).json(req.employee);
};


exports.findAllEmployees = async (req, res) => {
  try {
    const employees = EmployeeService.findAllEmployees();
    res.status(200).json(employees);
  } catch (e) {
    res
        .status(400)
        .json({error: e});
  }
  res.status(200).json(req.employee);
};

