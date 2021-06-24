/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
const bcrypt = require('bcryptjs');

const AUTH_CREDENTIALS_ERROR = 'Password or email incorrect';

module.exports = (sequelize, DataTypes) => {
  class Employee extends Model {
    static associate(models) {
      Employee.belongsTo(models.Profile, {
        foreignKey: 'profileId',
        as: 'profile',
      });
      Employee.belongsTo(models.Department, {
        foreignKey: 'departmentId',
        as: 'department',
      });
      this.belongsToMany(models.Commission, {
        through: 'Empleado_has_Comision',
        as: 'commission',
        foreignKey: 'Empleado_idEmpleado',
        otherKey: 'Comision_idComision',
        timestamps: false,
      });
    }
  }

  Employee.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idEmpleado',
    },
    name: {
      type: DataTypes.STRING,
      field: 'NombreEmp',
    },
    lastName: {
      type: DataTypes.STRING,
      field: 'ApellidoEmp',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: 'TelefonoEmp',
    },
    email: {
      type: DataTypes.STRING,
      field: 'CorreoEmp',
    },
    password: {
      type: DataTypes.STRING,
      field: 'ContraseñaEmp',
    },
    profileId: {
      type: DataTypes.INTEGER,
      field: 'Perfiles_idPerfiles',
    },
    departmentId: {
      type: DataTypes.INTEGER,
      field: 'Areas_idAreas',
    },
  },
  {
    sequelize,
    modelName: 'Employee',
    tableName: 'Empleado',
    timestamps: false,
  },
  );

  Employee.beforeCreate(async (employee) => {
    if (employee.password) {
      employee.password = await bcrypt.hash(employee.password, 8);
    }
  });

  Employee.findByCredentials = async (email, password) => {
    const employee = await Employee.findOne({
      where: {
        email: email,
      },
      include: ['profile', 'department'],
    });
    if (!employee) {
      throw new Error(AUTH_CREDENTIALS_ERROR);
    }
    const match = await bcrypt.compare(password, employee.password);
    if (!match) {
      throw new Error(AUTH_CREDENTIALS_ERROR);
    }
    return employee;
  };

  Employee.prototype.toJSON = function() {
    const employeeJson = Object.assign({}, this.get());
    delete employeeJson.password;
    return employeeJson;
  };

  return Employee;
};
