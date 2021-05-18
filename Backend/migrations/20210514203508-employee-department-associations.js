'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
        'Empleado',
        'Areas_idAreas',
        {
          type: Sequelize.INTEGER,
          references: {
            model: 'Areas',
            key: 'idArea',
          },
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
        },
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(
        'Empleado',
        'Areas_idAreas',
    );
  },
};
