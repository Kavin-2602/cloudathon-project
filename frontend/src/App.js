import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import EventList from "./components/EventList";
import Footer from "./components/Footer";
import SplashScreen from "./components/SplashScreen";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./styles/app.css";
import { io } from "socket.io-client";

// Connect to backend Socket.IO server
const socket = io("http://localhost:3000");

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [idleVMs, setIdleVMs] = useState([]);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    socket.on("welcome", (msg) => {
      console.log("Realtime:", msg);
      toast.info(msg.message);
    });

    socket.on("eventUpdate", (data) => {
      console.log("Realtime event:", data);
      toast.success(`New Event: ${data.title || JSON.stringify(data)}`);
    });

    socket.on("idleUpdate", (data) => {
      console.log("Realtime idle VMs:", data);
      setIdleVMs(data);
      if (data.length > 0) {
        toast.warn(`Idle VMs detected: ${data.map(vm => vm.id).join(", ")}`);
      }
    });

    return () => {
      socket.off("welcome");
      socket.off("eventUpdate");
      socket.off("idleUpdate");
    };
  }, []);

  // Trigger fade-in after splash finishes
  const handleSplashFinish = () => {
    setShowSplash(false);
    setTimeout(() => setFadeIn(true), 100); // slight delay for smoothness
  };

  return (
    <div className="App">
      {showSplash ? (
        <SplashScreen onFinish={handleSplashFinish} />
      ) : (
        <div className={`app-content ${fadeIn ? "fade-in" : ""}`}>
          <Navbar />
          <Dashboard idleVMs={idleVMs} socket={socket} />
          <EventList />
          <Footer />
          <ToastContainer position="bottom-right" autoClose={3000} />
        </div>
      )}

      {/* 🔹 Inline fade-in animation */}
      <style>
        {`
          .fade-in {
            animation: fadeInContent 1s ease forwards;
          }
          @keyframes fadeInContent {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
}

export default App;
