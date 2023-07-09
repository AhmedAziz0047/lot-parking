const express = require('express');
const router = express.Router();
const parking = require('../controllers/parking.controller')


// router.get('/getFirstFreeSlot/:vehicleType', parking.getFirstFreeSlot) testing route
router.post('/addslot', parking.createSlot) // optional in case to add manual slot 
router.get('/parkvehicle/:entryPoint/:vehicleType/:hoursNbr', parking.parkVehicle)
router.post('/unparkvehicle/:ticketId', parking.unparkVehicle)
router.get('/freeslots/:vehicleType', parking.freeSlotsNumber)
router.get('/findoneticket/:_id', parking.getOneTicket)

module.exports = router;