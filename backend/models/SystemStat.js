const mongoose = require("mongoose");
const { db, collection, addDoc } = require("../firebase");

const systemStatSchema = new mongoose.Schema({
  vmId: String,
  cpuUsage: Number,
  memUsage: Number,
  timestamp: Date
});

const SystemStat = mongoose.model("SystemStat", systemStatSchema);

// Firestore mirror
async function saveToFirestore(data) {
  await addDoc(collection(db, "systemStats"), {
    ...data,
    timestamp: new Date()
  });
}

module.exports = { SystemStat, saveToFirestore };
