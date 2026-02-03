const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyBtugZ_nKQUESVDTjXoKZ_xVms110F7kug",
  authDomain: "cloudathon-monitor.firebaseapp.com",
  projectId: "cloudathon-monitor",
  storageBucket: "cloudathon-monitor.firebasestorage.app",
  messagingSenderId: "544942251106",
  appId: "1:544942251106:web:939c912c7419802408853b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

module.exports = { db, collection, addDoc };
