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
      field: 'idArea',
    },
    departmentDescription: {
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
  });

  Department.prototype.toJSON = function() {
    const departmentJson = Object.assign({}, this.get());
    delete departmentJson.id;
    delete departmentJson.budgetTransport;
    delete departmentJson.budgetViatic;
    delete departmentJson.createdAt;
    delete departmentJson.updatedAt;
    return departmentJson;
  };

  return Department;
};
