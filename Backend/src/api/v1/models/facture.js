/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Facture extends Model {
    static associate(models) {
      Facture.belongsTo(
          models.Commission, {
            foreignKey: 'commissionId',
            as: 'commission',
          },
      );
    }
  }

  Facture.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idFactura',
    },
    factureDescription: {
      type: DataTypes.STRING,
      field: 'DescripcionFactura',
    },
    date: {
      type: DataTypes.STRING,
      field: 'FechaEmision',
    },
    amount: {
      type: DataTypes.DOUBLE,
      field: 'MontoFactura',
    },
    commissionId: {
      type: DataTypes.INTEGER,
      field: 'Comision_idComision',
    },
    filePath: {
      type: DataTypes.STRING,
      field: 'rutaArchivo',
    },
  }, {
    sequelize,
    modelName: 'Facture',
    tableName: 'Factura',
    timestamps: false,
  });

  Facture.prototype.toJSON = function() {
    const factureJSON = Object.assign({}, this.get());
    delete factureJSON.commissionId;
    return factureJSON;
  };


  return Facture;
};
