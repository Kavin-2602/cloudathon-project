const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  instanceId: String,
  status: String,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Resource', ResourceSchema);
