/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commission extends Model {
    static associate(models) {
      this.belongsToMany(models.Employee, {
        through: 'Empleado_has_Comision',
        as: 'employees',
        foreignKey: 'Comision_idComision',
        otherKey: 'Empleado_idEmpleado',
        timestamps: false,
      });
    }
  };
  Commission.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idComision',
    },
    typeCommision: {
      type: DataTypes.STRING,
      field: 'TipoComision',
    },
    isApproved: {
      type: DataTypes.BOOLEAN,
      field: 'ComisionAprobada',
    },
    beginDate: {
      type: DataTypes.TIME,
      field: 'FechaInicio',
    },
    endDate: {
      type: DataTypes.TIME,
      field: 'FechaFin',
    },
  }, {
    sequelize,
    modelName: 'Commission',
    tableName: 'Comision',
    timestamps: false,
  });

  return Commission;
};
