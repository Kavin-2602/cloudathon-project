import { useEffect, useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";
import socket from "../socket"; // adjust path if needed

useEffect(() => {
  socket.on("welcome", (data) => {
    console.log("✅ WebSocket connected:", data.message);
  });

  return () => {
    socket.off("welcome");
  };
}, []);


export default function Navbar() {
  const [status, setStatus] = useState("Disconnected");

  useEffect(() => {
    const checkStatus = () => {
      api.get("/events")
        .then(() => {
          if (status !== "Connected") {
            toast.success("✅ Connected to backend");
            setStatus("Connected");
          }
        })
        .catch(() => {
          if (status !== "Disconnected") {
            toast.error("❌ Disconnected from backend");
            setStatus("Disconnected");
          }
        });
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000);
    return () => clearInterval(interval);
  }, [status]);

  const handleTitleClick = () => {
    toast.success("💰 Cloud idle time minimized — resources saved!");
  };

  return (
    <>
      <style>
        {`
          @keyframes floatLogo {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0px); }
          }

          @keyframes pulseGlow {
            0% { filter: drop-shadow(0 0 6px #38bdf8); }
            50% { filter: drop-shadow(0 0 15px #38bdf8); }
            100% { filter: drop-shadow(0 0 6px #38bdf8); }
          }

          @keyframes slideInNavbar {
            0% { transform: translateY(-100%); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }

          .navbar {
            position: sticky;
            top: 0;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            padding: 10px 20px;
            color: white;
            border-bottom: 1px solid rgba(255,255,255,0.2);
            animation: slideInNavbar 0.8s ease-out forwards;
          }

          .navbar-left {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .logo {
            height: 70px;
            cursor: pointer;
            animation: floatLogo 3s ease-in-out infinite, pulseGlow 2s ease-in-out infinite;
            transition: transform 0.3s ease;
          }

          .logo:hover {
            transform: scale(1.1) rotate(-3deg);
            filter: drop-shadow(0 0 20px #38bdf8);
          }

          .app-title {
            cursor: pointer;
            font-weight: bold;
            font-size: 22px;
          }

          .nav-links {
            list-style: none;
            display: flex;
            gap: 20px;
          }

          .nav-links a {
            color: white;
            text-decoration: none;
            font-weight: 500;
          }

          .nav-links a:hover {
            color: #38bdf8;
          }

          .status {
            padding: 5px 10px;
            border-radius: 5px;
            font-weight: bold;
          }

          .connected { background: green; }
          .disconnected { background: red; }
        `}
      </style>

      <nav className="navbar">
        <div className="navbar-left">
          <img src="/logo-bg.png" alt="Cloud Guardian Logo" className="logo" />
          <h2 className="app-title" onClick={handleTitleClick}>
            Billwise Guardian
          </h2>
        </div>

        <ul className="nav-links">
          <li><a href="#dashboard">Dashboard</a></li>
          <li><a href="#events">Events</a></li>
        </ul>

        <div className={`status ${status.toLowerCase()}`}>{status}</div>
      </nav>
    </>
  );
}
