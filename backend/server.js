require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const leadsRoutes = require('./routes/leads');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use('/leads', leadsRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
    process.exit(1);
  }
}

start();
