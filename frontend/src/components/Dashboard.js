import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import CloudVMPanel from "./CloudVMPanel";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Dashboard({ idleVMs, socket }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("systemUpdate", (stats) => {
      const newEvent = {
        timestamp: Date.now(),
        cpu: parseFloat(stats.cpuUsage),
        mem: parseFloat(stats.memUsage),
        vmId: stats.vmId || "local-device"
      };
      setEvents((prev) => [...prev, newEvent].slice(-20)); // keep last 20 points
    });

    return () => {
      socket.off("systemUpdate");
    };
  }, [socket]);

  const data = {
    labels: events.map((e) => new Date(e.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: "CPU Usage",
        data: events.map((e) => e.cpu),
        borderColor: "#ff4d4d",
        backgroundColor: "rgba(255,77,77,0.2)",
        tension: 0.4,
        fill: true
      },
      {
        label: "Memory Usage",
        data: events.map((e) => e.mem),
        borderColor: "#4da6ff",
        backgroundColor: "rgba(77,166,255,0.2)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    animation: { duration: 1500, easing: "easeInOutQuart" },
    plugins: { legend: { position: "top" } }
  };

  return (
    <div id="dashboard">
      <h2>System Dashboard</h2>
      {events.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>Waiting for realtime data...</p>
      )}

      {/* ✅ Single Idle Cloud Resource table */}
      <CloudVMPanel idleVMs={idleVMs} />
    </div>
  );
}
