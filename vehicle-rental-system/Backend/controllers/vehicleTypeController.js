const { VehicleType } = require('../models');

exports.getVehicleTypes = async (req, res) => {
  try {
    const wheelCount = req.query.wheelCount;
    let whereClause = {};
    
    if (wheelCount) {
      whereClause = { wheelCount };
    }
    
    const vehicleTypes = await VehicleType.findAll({
      where: whereClause
    });
    
    return res.status(200).json(vehicleTypes);
  } catch (error) {
    console.error('Error fetching vehicle types:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};