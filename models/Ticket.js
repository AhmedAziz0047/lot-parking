const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    vehicle: { type: String, required: true }, 
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }, 
    ticketId: { type: String, required: true, unique: true }
  });

  module.exports = mongoose.model('Ticket', ticketSchema);