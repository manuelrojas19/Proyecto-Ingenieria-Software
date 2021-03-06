const CredentialsError = require('../errors/credentials_error.js');
const NotFoundError = require('../errors/not_found_error.js');
const {Employee, Profile, Department} = require('../models/index.js');

const EMPLOYEE_EXIST_ERROR = 'Employee already exist';
const EMPLOYEE_ROLE_ERROR = 'Employee role does not exist';
const EMPLOYEE_CREDENTIALS_ERROR = 'Password or email incorrect';

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
  const employee = await Employee.findByCredentials(
      credentials.email,
      credentials.password,
  );
  if (!employee) {
    throw new CredentialsError(EMPLOYEE_CREDENTIALS_ERROR);
  }
  return employee;
};

exports.findEmployeeById = async (id) => {
  const employee = await Employee.findByPk(id, {
    include: [
      {
        association: 'profile',
        attributes: ['name'],
      },
      {
        association: 'department',
        attributes: ['id', 'name'],
      },
    ],
  });
  if (!employee) {
    throw new NotFoundError(`Employe with id ${id} was not found`);
  }
  return employee;
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
