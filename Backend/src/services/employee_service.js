const {Employee, Profile, Department} = require('../models/index.js');

const EMPLOYEE_EXIST_ERROR = 'Employee already exist';
const EMPLOYEE_ROLE_ERROR = 'Employee role does not exist';

exports.createEmployee = async (employee) => {
  const employeeExist = await Employee.findOne({
    where: {
      email: employee.email,
    },
  });
  if (employeeExist) {
    throw new Error(EMPLOYEE_EXIST_ERROR);
  }

  const profile = await Profile.findOne({
    where: {
      profileDescription: employee.profile,
    },
  });
  if (!profile) {
    throw new Error(EMPLOYEE_ROLE_ERROR);
  }

  const department = await Department.findOne({
    where: {
      departmentDescription: employee.department,
    },
  });

  // Si el perfil existe en la BD
  if (!department) {
    throw new Error(EMPLOYEE_ROLE_ERROR);
  }

  const createdEmployee = await Employee.create(employee);
  await createdEmployee.setProfile(profile);
  await createdEmployee.setDepartment(department);

  return Employee.findByPk(createdEmployee.id, {
    include: ['profile', 'department'],
  });
};

exports.findEmployeeByCredentials = async (credentials) => {
  return Employee.findByCredentials(credentials.email, credentials.password);
};

exports.findEmployeeById = async (employeeId) => {
  return Employee.findByPk(employeeId, {
    include: [
      {
        association: 'profile',
        attributes: ['name'],
      },
      {
        association: 'department',
        attributes: ['name'],
      },
    ],
  });
};

exports.findAllEmployees = async (employeeId) => {
  return Employee.findAll();
};

exports.findEmployeesByDepartment = async (departmentName) => {
  const departmentExist = await Department.findOne({
    where: {
      departmentDescription: departmentName,
    },
  });
  if (!departmentExist) {
    throw new Exception('Department does not exists');
  }
  return Employee.findAll({
    include: [
      {
        association: 'profile',
        where: {
          profileDescription: 'Empleado',
        },
      },
      {association: 'department'},
    ],
    where: {
      departmentId: departmentExist.id,
    },
  });
};
