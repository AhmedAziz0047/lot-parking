const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// db env config
require('dotenv').config({ path: './config/.env' });
require('./config/db');
// routes
app.get('/', (req,res)=>{
    res.send('ezrze')
})
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  })