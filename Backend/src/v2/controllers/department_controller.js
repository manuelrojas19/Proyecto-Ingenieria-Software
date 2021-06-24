const {DepartmentService} = require('../../v1/services/index.js');

exports.findAllDepartments = async (req, res) => {
  try {
    const departments = await DepartmentService.findAllDepartments();
    res.status(200).json(departments);
  } catch (e) {
    res.status(400).json({error: e.message});
  }
};
