const mongoose = require("mongoose");
const { db, collection, addDoc } = require("../firebase");

const eventSchema = new mongoose.Schema({
  vmId: String,
  eventType: String,
  reason: String,
  timestamp: Date
});

const Event = mongoose.model("Event", eventSchema);

// Firestore mirror
async function saveEventToFirestore(data) {
  await addDoc(collection(db, "events"), {
    ...data,
    timestamp: new Date()
  });
}

module.exports = { Event, saveEventToFirestore };
