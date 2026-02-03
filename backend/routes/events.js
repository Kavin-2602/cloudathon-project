const express = require("express");
const router = express.Router();
const { Event, saveEventToFirestore } = require("../models/Event");
const { db, collection, getDocs } = require("../firebase");

// ✅ Original route — DO NOT TOUCH
router.get("/", (req, res) => {
  res.send("Events route is working!");
});

// 🔹 GET /events/all — return all events from Firebase
router.get("/all", async (req, res) => {
  try {
    const snapshot = await getDocs(collection(db, "events"));
    const events = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(events);
  } catch (err) {
    res.status(500).send("❌ Error fetching events: " + err.message);
  }
});

// 🔹 POST /events — save to MongoDB and Firebase
router.post("/", async (req, res) => {
  try {
    const event = new Event(req.body);
   
    await saveEventToFirestore(req.body); // Firebase
    res.status(200).send("✅ Event saved to MongoDB and Firebase");
  } catch (err) {
    res.status(500).send("❌ Error saving event: " + err.message);
  }
});

module.exports = router;
