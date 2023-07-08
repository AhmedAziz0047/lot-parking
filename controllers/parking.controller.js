const Slot = require("./../models/Slot");
const Ticket = require("./../models/Ticket");

exports.getFirstFreeSlot = async (req, res) => {
  const vehicleType = req.params.vehicleType;
  Slot.findOne({ isOccupied: false, type: vehicleType })
    .sort({ slotNumber: 1, slotNumber: 1 })
    .then((slot) => res.status(200).send(slot))
    .catch((err) => res.status(400).json({ error: err.message }));
};

exports.parkVehicle = async (req, res) => {
  const vehicleType = req.params.vehicleType;

  try {
    const slot = await Slot.findOne({
      isOccupied: false,
      type: vehicleType,
    }).sort({ slotNumber: 1, floorNumber: 1 });
    if (!slot) {
      return res.status(400).json({ error: "No slots available" });
    }
    slot.isOccupied = true; // Set isOccupied to true
    await slot.save(); // Save the updated slot

    const ticket = new Ticket({
      vehicle: slot.type,
      slot: slot._id,
      ticketId: "FLOOR-" + slot.floorNumber + "-SLOT-" + slot.slotNumber,
    });
    ticket
      .save()
      .then(() => res.status(201).json({ message: "ticket created!" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

