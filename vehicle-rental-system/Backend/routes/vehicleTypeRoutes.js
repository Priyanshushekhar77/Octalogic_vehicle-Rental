const express = require('express');
const router = express.Router();
const vehicleTypeController = require('../controllers/vehicleTypeController');

router.get('/', vehicleTypeController.getVehicleTypes);

module.exports = router;
