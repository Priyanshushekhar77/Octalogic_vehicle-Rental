'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('VehicleTypes', [
      {
        name: 'Hatchback',
        wheelCount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'SUV',
        wheelCount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Sedan',
        wheelCount: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cruiser',
        wheelCount: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('VehicleTypes', null, {});
  }
};