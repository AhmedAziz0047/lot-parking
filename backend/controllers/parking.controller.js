const Slot = require("./../models/Slot");
const Ticket = require("./../models/Ticket");

// secure ticket id
const randomString = generateRandomString(4); // Generate a random string of 4 characters

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

// testing controller
// exports.getFirstFreeSlot = async (req, res) => {
//   try {
//     const vehicleType = req.params.vehicleType;
//     const slot = await Slot.findOne({ isOccupied: false, type: vehicleType }).sort({ slotNumber: 1 });
//     if (!slot) {
//       return res.status(400).json({ error: "No slots available" });
//     }
//     res.status(200).send(slot);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// };

exports.parkVehicle = async (req, res) => {
  try {
    const vehicleType = req.params.vehicleType;
    const hoursNbr = req.params.hoursNbr;
    const entryPoint = req.params.entryPoint

    const slot = await Slot.findOneAndUpdate(
      { type: vehicleType, isOccupied: false },
      { $set: { isOccupied: true } },
      { sort: { floorNumber: 1, slotNumber: 1 }, new: true } //new is to prevent^ù simultaneous requests from giving the same slot
    );

    if (!slot) {
      return res.status(400).json({ error: "No slots available" });
    }

    const ticket = new Ticket({
      vehicle: slot.type,
      slot: slot._id,
      ticketId: `F-${slot.floorNumber}-S-${slot.slotNumber}-${randomString}`, //random string to perform security tickey key
      parkDuration: hoursNbr,
      entryPoint:entryPoint
    });

    const hoursToAdd = ticket.parkDuration;
    ticket.endTime = new Date(ticket.time.getTime() + hoursToAdd * 3600000);

    await ticket.save();
    res.status(201).json({ message: "Ticket created!", ticket });
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
    await Ticket.deleteOne({_id:ticket._id});

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
        },
      },
      {
        $group: {
          _id: '$floorNumber',
          freeSlotsCount: {
            $sum: {
              $cond: [{ $eq: ['$isOccupied', false] }, 1, 0],
            },
          },
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
