const Slot = require("./../models/Slot");
const Ticket = require("./../models/Ticket");
const Vehicle = require("./../models/Vehicle");

exports.getFirstFreeSlot = async (req, res) => {
  const vehicleType = req.params.vehicleType;
  Slot.findOne({ isOccupied: false, type: vehicleType })
    .sort({ slotNumber: 1, slotNumber: 1 })
    .then((slot) => res.status(200).send(slot))
    .catch((err) => res.status(400).json({ error: err.message }));
};

