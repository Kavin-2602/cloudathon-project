const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const os = require('os-utils');
const { db, collection, addDoc } = require('./firebase');

const eventsRoute = require('./routes/events');
const { router: detectIdleRoute } = require('./detectIdle');
const vmsRoute = require('./routes/vms');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3001", methods: ["GET", "POST"] }
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", "http://localhost:3000", "ws://localhost:3000"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:"],
      manifestSrc: ["'self'"]
    }
  })
);

// Routes
app.use('/events', eventsRoute);
app.use('/idle', detectIdleRoute);
app.use('/vms', vmsRoute);

// Serve static frontend (optional)
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Attach io to app
app.set('io', io);

// Socket.IO events
io.on('connection', (socket) => {
  console.log('⚡ Client connected');
  socket.emit('welcome', { message: 'Realtime connection established!' });

  socket.on('newEvent', (data) => {
    io.emit('eventUpdate', data);
  });

  socket.on('metrics', async ({ vmId, cpu, memory }) => {
    const stats = {
      vmId,
      cpuUsage: cpu,
      memUsage: memory,
      timestamp: new Date()
    };

    try {
      await addDoc(collection(db, "systemStats"), stats);
      console.log("✅ System stats saved to Firebase:", stats);
    } catch (err) {
      console.error("❌ Firebase error:", err.message);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ Client disconnected');
  });
});

// Emit local system stats every 5 seconds
setInterval(() => {
  os.cpuUsage((cpu) => {
    const stats = {
      vmId: "local-device",
      cpuUsage: (cpu * 100).toFixed(2),
      memUsage: ((1 - os.freememPercentage()) * 100).toFixed(2),
      timestamp: Date.now()
    };

    io.emit('systemUpdate', stats);

    // Optional: Save to Firestore
    addDoc(collection(db, "systemStats"), stats)
      .then(() => console.log("✅ Local system stats saved to Firebase"))
      .catch((err) => console.error("❌ Firebase error:", err.message));
  });
}, 5000);

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
