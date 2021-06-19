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
        typeCommission: {
          type: DataTypes.STRING,
          field: 'TipoComision',
        },
        isApprovedByManager: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
          defaultValue: null,
          field: 'ComisionAprobadaJefeArea',
        },
        isApprovedByFinances: {
          allowNull: true,
          defaultValue: null,
          type: DataTypes.BOOLEAN,
          field: 'ComisionAprobadaFinanzas',
        },
        beginDate: {
          type: DataTypes.TIME,
          field: 'FechaInicio',
        },
        endDate: {
          type: DataTypes.TIME,
          field: 'FechaFin',
        },
        placeCommission: {
          type: DataTypes.STRING,
          field: 'LugarComision',
        },
        amountAssigned: {
          type: DataTypes.STRING,
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

  Commission.prototype.toJSON = function() {
    const commissionJson = Object.assign({}, this.get());
    delete commissionJson.Empleado_has_Comision;
    return commissionJson;
  };

  return Commission;
};
