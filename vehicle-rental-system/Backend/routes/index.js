const express = require('express');
const router = express.Router();
const vehicleTypeRoutes = require('./vehicleTypeRoutes');
const vehicleRoutes = require('./vehicleRoutes');
const bookingRoutes = require('./bookingRoutes');

router.use('/vehicle-types', vehicleTypeRoutes);
router.use('/vehicles', vehicleRoutes);
router.use('/bookings', bookingRoutes);

module.exports = router;