'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Get the vehicle type IDs
    const vehicleTypes = await queryInterface.sequelize.query(
      'SELECT id, name FROM VehicleTypes;'
    );
    
    const vehicleTypeRows = vehicleTypes[0];
    
    // Create a map of vehicle type name to ID
    const vehicleTypeMap = {};
    vehicleTypeRows.forEach(row => {
      vehicleTypeMap[row.name] = row.id;
    });

    // Insert vehicles
    await queryInterface.bulkInsert('Vehicles', [
      // Hatchbacks
      {
        model: 'Honda Fit',
        vehicleTypeId: vehicleTypeMap['Hatchback'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Toyota Yaris',
        vehicleTypeId: vehicleTypeMap['Hatchback'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Volkswagen Golf',
        vehicleTypeId: vehicleTypeMap['Hatchback'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // SUVs
      {
        model: 'Toyota RAV4',
        vehicleTypeId: vehicleTypeMap['SUV'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Honda CR-V',
        vehicleTypeId: vehicleTypeMap['SUV'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Jeep Wrangler',
        vehicleTypeId: vehicleTypeMap['SUV'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Sedans
      {
        model: 'Toyota Camry',
        vehicleTypeId: vehicleTypeMap['Sedan'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Honda Civic',
        vehicleTypeId: vehicleTypeMap['Sedan'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'BMW 3 Series',
        vehicleTypeId: vehicleTypeMap['Sedan'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      
      // Cruisers
      {
        model: 'Harley Davidson Iron 883',
        vehicleTypeId: vehicleTypeMap['Cruiser'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        model: 'Indian Scout',
        vehicleTypeId: vehicleTypeMap['Cruiser'],
        available: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Vehicles', null, {});
  }
};