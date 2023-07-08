const vehicleSchema = new mongoose.Schema({
    type: { type: String, required: true }, 
    id: { type: String, required: true, unique: true }
  });