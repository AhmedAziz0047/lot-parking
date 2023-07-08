const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }, 
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }, 
    ticketId: { type: String, required: true, unique: true }
  });s

  module.exports = mongoose.model('Ticket', FlightsSchema);