const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const seedSlots = require('./seed')
// db env config
require('dotenv').config({ path: './config/.env' });
require('./config/db');
// routes
const parkingRoutes = require('./routes/parking')
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
seedSlots()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', parkingRoutes)
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  })