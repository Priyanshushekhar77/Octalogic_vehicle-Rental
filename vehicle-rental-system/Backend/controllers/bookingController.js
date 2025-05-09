const { Booking, User, Vehicle, sequelize } = require('../models');
const { Op } = require('sequelize');

exports.createBooking = async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    const { firstName, lastName, vehicleId, startDate, endDate } = req.body;
    
    if (!firstName || !lastName || !vehicleId || !startDate || !endDate) {
      await transaction.rollback();
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Invalid date format' });
    }
    
    if (start >= end) {
      await transaction.rollback();
      return res.status(400).json({ message: 'End date must be after start date' });
    }
    
    // Check if the vehicle is available for the specified date range
    const existingBooking = await Booking.findOne({
      where: {
        vehicleId,
        [Op.or]: [
          {
            startDate: { [Op.between]: [start, end] }
          },
          {
            endDate: { [Op.between]: [start, end] }
          },
          {
            [Op.and]: [
              { startDate: { [Op.lte]: start } },
              { endDate: { [Op.gte]: end } }
            ]
          }
        ]
      },
      transaction
    });
    
    if (existingBooking) {
      await transaction.rollback();
      return res.status(400).json({ message: 'Vehicle is not available for the selected dates' });
    }
    
    // Create or find user
    const [user, created] = await User.findOrCreate({
      where: { firstName, lastName },
      defaults: { firstName, lastName },
      transaction
    });
    
    // Create booking
    const booking = await Booking.create({
      userId: user.id,
      vehicleId,
      startDate: start,
      endDate: end
    }, { transaction });
    
    await transaction.commit();
    
    return res.status(201).json({
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    await transaction.rollback();
    console.error('Error creating booking:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};