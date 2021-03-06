/* eslint-disable require-jsdoc */
/* eslint-disable valid-jsdoc */
'use strict';
const {
  Model,
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.hasMany(models.Employee, {
        foreignKey: 'profileId',
        as: 'employees',
      },
      );
    }
  }

  Profile.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: 'idPerfiles',
    },
    name: {
      type: DataTypes.STRING,
      field: 'DescripcionPerfil',
    },
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'Perfiles',
    timestamps: false,
  });

  return Profile;
};
