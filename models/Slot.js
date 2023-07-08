const mongoose = require('mongoose')

const slotSchema = new mongoose.Schema({
    type: { type: String, required: true }, 
    floorNumber: { type: Number, required: true },
    slotNumber: { type: Number, required: true },
    isOccupied: { type: Boolean, default: false }
  });
  module.exports = mongoose.model('Slot', FlightsSchema);