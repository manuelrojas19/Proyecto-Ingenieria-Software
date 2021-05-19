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
      PasswordEmp: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Empleado');
  },
};
