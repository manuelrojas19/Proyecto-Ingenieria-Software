'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
        'Areas',
        [
          {
            NombreArea: 'Marketing',
            DescripcionArea: 'Departamento de Marketing',
            PresupuestoTransporte: 600000.00,
            PresupuestoViatico: 600000.00,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Areas', null, {});
  },
};
