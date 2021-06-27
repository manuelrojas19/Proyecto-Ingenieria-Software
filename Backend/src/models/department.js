/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Department extends Model {
    static associate(models) {
      this.hasMany(models.Employee, {
        foreignKey: 'departmentId',
        as: 'employees',
      },
      );
    }
  };
  Department.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idAreas',
    },
    name: {
      type: DataTypes.STRING,
      field: 'DescripcionArea',
    },
    budgetTransport: {
      type: DataTypes.DOUBLE,
      field: 'PresupuestoTransporte',
    },
    budgetViatic: {
      type: DataTypes.DOUBLE,
      field: 'PresupuestoViatico',
    },
  }, {
    sequelize,
    modelName: 'Department',
    tableName: 'Areas',
    timestamps: false,
  });

  return Department;
};
