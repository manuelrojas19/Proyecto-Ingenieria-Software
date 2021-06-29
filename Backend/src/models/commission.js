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
        foreignKey: 'commissionId',
        as: 'commissions',
      });
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
        type: {
          type: DataTypes.STRING,
          field: 'TipoComision',
        },
        managerApproval: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: null,
          field: 'ComisionAprobadaJefeArea',
        },
        financesApproval: {
          allowNull: true,
          defaultValue: null,
          type: DataTypes.BOOLEAN,
          field: 'ComisionAprobadaFinanzas',
        },
        startDate: {
          type: DataTypes.TIME,
          field: 'FechaInicio',
        },
        endDate: {
          type: DataTypes.TIME,
          field: 'FechaFin',
        },
        place: {
          type: DataTypes.STRING,
          field: 'LugarComision',
        },
        amountDeposited: {
          type: DataTypes.DOUBLE,
          field: 'MontoAsignado',
        },
      },
      {
        sequelize,
        modelName: 'Commission',
        tableName: 'Comision',
        timestamps: false,
      },
  );

  return Commission;
};
