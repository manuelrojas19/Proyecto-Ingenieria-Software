/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Commission extends Model {
    static associate(models) {
      this.belongsToMany(models.Employee, {
        through: 'Empleado_has_Comision',
        as: 'employee',
        foreignKey: 'Comision_idComision',
        otherKey: 'Empleado_idEmpleado',
        timestamps: false,
      });
      this.hasMany(models.Facture, {
        foreignKey: 'comissionId',
        as: 'commissions',
      })
    }
  }
  Commission.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          field: 'idComision',
        },
        typeCommission: {
          type: DataTypes.STRING,
          field: 'TipoComision',
        },
        isApproved: {
          type: DataTypes.BOOLEAN,
          field: 'ComisionAprobada',
          defaultValue: false,
        },
        beginDate: {
          type: DataTypes.TIME,
          field: 'FechaInicio',
        },
        endDate: {
          type: DataTypes.TIME,
          field: 'FechaFin',
        },
      },
      {
        sequelize,
        modelName: 'Commission',
        tableName: 'Comision',
        timestamps: false,
      },
  );

  Commission.prototype.toJSON = function() {
    const commissionJson = Object.assign({}, this.get());
    delete commissionJson.Empleado_has_Comision;
    return commissionJson;
  };

  return Commission;
};
