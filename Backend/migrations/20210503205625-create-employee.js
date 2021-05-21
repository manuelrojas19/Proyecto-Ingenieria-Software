'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Empleado', {
      idEmpleado: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      NombreEmp: {
        type: Sequelize.STRING,
      },
      ApellidoEmp: {
        type: Sequelize.STRING,
      },
      TelefonoEmp: {
        type: Sequelize.STRING,
      },
      CorreoEmp: {
        type: Sequelize.STRING,
      },
      ContraseñaEmp: {
        type: Sequelize.STRING,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Empleado');
  },
};
