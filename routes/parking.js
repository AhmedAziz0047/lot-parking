const express = require('express');
const router = express.Router();
const parking = require('../controllers/parking.controller')

router.get('/getFirstFreeSlot/:vehicleType', parking.getFirstFreeSlot)
router.post('/addslot', parking.createSlot)
router.get('/addTicket/:vehicleType', parking.parkVehicle)
router.get('/unparkvehicule/:ticketId', parking.unparkVehicle)

module.exports = router;