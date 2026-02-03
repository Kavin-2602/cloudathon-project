const mongoose = require("mongoose");
const { db, collection, addDoc } = require("../firebase");

const idleVMSchema = new mongoose.Schema({
  vmId: String,
  idleDuration: Number,
  detectedBy: String,
  timestamp: Date
});

const IdleVM = mongoose.model("IdleVM", idleVMSchema);

// Firestore mirror
async function saveIdleVMToFirestore(data) {
  await addDoc(collection(db, "idleVMs"), {
    ...data,
    timestamp: new Date()
  });
}

module.exports = { IdleVM, saveIdleVMToFirestore };
