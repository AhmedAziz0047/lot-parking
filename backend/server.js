const express = require('express')
const bodyParser = require('body-parser');
// const cors = require('cors');
const app = express();
const seedSlots = require('./seed')
// db env config
require('dotenv').config({ path: './config/.env' });
require('./config/db');
// routes
const parkingRoutes = require('./routes/parking')

seedSlots()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', parkingRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  })