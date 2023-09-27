

const express = require('express');
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const cors = require('cors');
const bookroutes = require('./routes/bookroutes');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/books/', bookroutes);

connectDB();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});



