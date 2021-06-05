const DepartmentService = require('../services/department_service.js');

exports.findAllDepartments = async (req, res) => {
  try {
    const departments = await DepartmentService.findAllDepartments();
    res.status(200).json(departments);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};
