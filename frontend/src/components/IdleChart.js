import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import api from "../services/api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function IdleChart() {
  const [events, setEvents] = useState([]);   // ✅ safe initialization

  useEffect(() => {
    api.get("/events")
      .then(res => setEvents(res.data))
      .catch(err => {
        console.error("❌ API error:", err);
        setEvents([]);   // fallback
      });
  }, []);

  const data = {
    labels: events.length > 0
      ? events.map(e => new Date(e.timestamp).toLocaleTimeString())
      : [],
    datasets: [
      {
        label: "CPU Usage",
        data: events.length > 0 ? events.map(e => e.cpu) : [],
        borderColor: "blue",
        fill: false,
      },
      {
        label: "Memory Usage",
        data: events.length > 0 ? events.map(e => e.mem) : [],
        borderColor: "green",
        fill: false,
      }
    ]
  };

  return (
    <div id="dashboard">
      <h3>System Dashboard</h3>
      {events.length > 0 ? <Line data={data} /> : <p>Loading events...</p>}
    </div>
  );
}
