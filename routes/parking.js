const express = require('express');
const router = express.Router();
const parking = require('../controllers/parking.controller')

router.get('/getFirstFreeSlot/:vehicleType', parking.getFirstFreeSlot)
router.post('/addslot', parking.createSlot) // optional in case to add manual slot 
router.post('/parkvehicle/:vehicleType/:hoursNbr', parking.parkVehicle)
router.post('/unparkvehicle/:ticketId', parking.unparkVehicle)
router.get('/freeslots/:vehicleType', parking.freeSlotsNumber)

module.exports = router;