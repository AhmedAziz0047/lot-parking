const Slot = require("./../models/Slot");
const Ticket = require("./../models/Ticket");

// secure ticker id
const randomString = generateRandomString(4); // Generate a random string of 4 characters

// Function to generate a random string of given length
function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

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
      ticketId: "FLOOR-" + slot.floorNumber + "-SLOT-" + slot.slotNumber + "-" + randomString,
    });
    ticket
      .save()
      .then(() => res.status(201).json({ message: "ticket created!" }))
      .catch((error) => res.status(400).json({ error }));
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};




exports.createSlot = async (req, res, next) => {
  const slot = new Slot({
    ...req.body,
  });
  slot
    .save()
    .then(() => res.status(201).json({ message: "slot created  !" }))
    .catch((error) => res.status(400).json({ message:"truck car bike" }));
};
