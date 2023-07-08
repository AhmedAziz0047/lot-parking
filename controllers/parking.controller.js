const Slot = require("./../models/Slot");
const Ticket = require("./../models/Ticket");

// secure ticket id
const randomString = generateRandomString(4); // Generate a random string of 4 characters

// Function to generate a random string of given length
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const result = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result.push(characters.charAt(randomIndex));
  }

  return result.join("");
}

exports.getFirstFreeSlot = async (req, res) => {
  try {
    const vehicleType = req.params.vehicleType;
    const slot = await Slot.findOne({ isOccupied: false, type: vehicleType }).sort({ slotNumber: 1 });
    if (!slot) {
      return res.status(400).json({ error: "No slots available" });
    }
    res.status(200).send(slot);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.parkVehicle = async (req, res) => {
  try {
    const vehicleType = req.params.vehicleType;
    const slot = await Slot.findOne({ isOccupied: false, type: vehicleType }).sort({ slotNumber: 1, floorNumber: 1 });
    if (!slot) {
      return res.status(400).json({ error: "No slots available" });
    }
    slot.isOccupied = true; // Set isOccupied to true
    await slot.save(); // Save the updated slot

    const ticket = new Ticket({
      vehicle: slot.type,
      slot: slot._id,
      ticketId: `FLOOR-${slot.floorNumber}-SLOT-${slot.slotNumber}-${randomString}`,
    });
    await ticket.save();
    res.status(201).json({ message: "ticket created!" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.unparkVehicle = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ ticketId: req.params.ticketId }).exec();
    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    await Slot.findByIdAndUpdate(ticket.slot, { isOccupied: false });

    res.status(201).json({ message: "Thank you for choosing us. Stay safe!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.freeSlotsNumber = async (req, res) => {
  try {
    const { vehicleType } = req.params;

    const freeSlotsPerFloor = await Slot.aggregate([
      {
        $match: {
          type: vehicleType,
          isOccupied: false,
        },
      },
      {
        $group: {
          _id: '$floorNumber',
          freeSlotsCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          floorNumber: '$_id',
          freeSlotsCount: 1,
        },
      },
    ]);

    res.json(freeSlotsPerFloor);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

// optional in case to add manual slot
exports.createSlot = async (req, res) => {
  const slot = new Slot({ ...req.body });
  try {
    await slot.save();
    res.status(201).json({ message: "slot created!" });
  } catch (error) {
    res.status(400).json({ message: "truck car bike" });
  }
};
