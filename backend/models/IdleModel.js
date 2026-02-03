const mongoose = require('mongoose');

const idleSchema = new mongoose.Schema({
  id: String,
  cpu: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Idle', idleSchema);
