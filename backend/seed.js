const Slot = require('./models/Slot');

const seedSlots = async () => {
  try {
    const existingSlots = await Slot.countDocuments();
    if (existingSlots > 0) {
      console.log('Slots already exist in the database.');
      return;
    }

    const floors = 5;
    const slotsPerFloor = 4;
    const vehicleTypes = ['car', 'bike', 'truck']; 

    let typeIndex = 0;

    for (let floor = 1; floor <= floors; floor++) {
      const slots = [];
      for (let slotNumber = 1; slotNumber <= slotsPerFloor; slotNumber++) {
        const type = vehicleTypes[typeIndex]; 

        slots.push({
          floorNumber: floor,
          slotNumber: slotNumber,
          isOccupied: false,
          type: type,
        });

        typeIndex = (typeIndex + 1) % vehicleTypes.length; 
      }
      await Slot.insertMany(slots);
    }

    console.log('Slots seeded successfully.');
  } catch (error) {
    console.error('Error seeding slots:', error);
  }
};

module.exports = seedSlots;