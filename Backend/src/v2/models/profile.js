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
    profileDescription: {
      type: DataTypes.STRING,
      field: 'DescripcionPerfil',
    },
  }, {
    sequelize,
    modelName: 'Profile',
    tableName: 'Perfiles',
    timestamps: false,
  });

  Profile.prototype.toJSON = function() {
    const profileJson = Object.assign({}, this.get());
    delete profileJson.id;
    delete profileJson.createdAt;
    delete profileJson.updatedAt;
    return profileJson;
  };

  return Profile;
};
