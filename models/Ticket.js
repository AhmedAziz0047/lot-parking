const mongoose = require('mongoose')

const ticketSchema = new mongoose.Schema({
    vehicle: { type: String, required: true }, 
    slot: { type: mongoose.Schema.Types.ObjectId, ref: 'Slot', required: true }, 
    ticketId: { type: String, required: true, unique: true },
    parkDuration: { type: Number, required: true },
    time: { type: Date, default: Date.now },
    endTime: { type: Date, required: true },
    entryPoint: { type: Number, required: true, enum: [1, 2] },

  });

  module.exports = mongoose.model('Ticket', ticketSchema);