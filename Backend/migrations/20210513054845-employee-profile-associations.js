'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Empleado',
        'Perfiles_idPerfiles',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Perfiles',
            key: 'idPerfil',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn(
        'Empleado',
        'Perfiles_idPerfiles',
    );
  },
};
