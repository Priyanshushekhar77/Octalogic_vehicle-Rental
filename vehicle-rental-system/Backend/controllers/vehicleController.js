const { Vehicle, VehicleType } = require('../models');

exports.getVehicles = async (req, res) => {
  try {
    const { vehicleTypeId } = req.query;
    let whereClause = {};
    
    if (vehicleTypeId) {
      whereClause = { vehicleTypeId };
    }
    
    const vehicles = await Vehicle.findAll({
      where: whereClause,
      include: [
        {
          model: VehicleType,
          as: 'vehicleType'
        }
      ]
    });
    
    return res.status(200).json(vehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
