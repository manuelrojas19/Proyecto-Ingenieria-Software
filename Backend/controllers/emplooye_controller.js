const EmployeeService = require('../services/employee_service.js');

exports.me = async (req, res) => {
  res.status(200).json(req.employee);
};

exports.findAllEmployees = async (req, res) => {
  try {
    const employees = await EmployeeService.findAllEmployees();
    res.status(200).json(employees);
  } catch (e) {
    res.status(400).json({error: e});
  }
};

exports.findEmployeesByDepartment = async (req, res) => {
  const department = req.params.department;
  try {
    const employees = await EmployeeService.findEmployeesByDepartment(
        department,
    );
    res.status(200).json(employees);
  } catch (e) {
    console.log(e);
    res.status(400).json({error: e});
  }
};
