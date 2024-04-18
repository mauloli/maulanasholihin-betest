const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const routerNav = require('./routes')

const app = express();
app.use(express.json());
const PORT = 3030;

const mongoURI = process.env.MONGO_URI;

app.use("/", routerNav);


mongoose.connect(mongoURI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting', err));


app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
