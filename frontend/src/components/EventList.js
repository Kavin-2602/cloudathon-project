import { useEffect, useState } from "react";
import socket from "../socket";



export default function EventList() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // Listen for realtime system stats
    socket.on("systemUpdate", (stats) => {
      const newLog = {
        timestamp: new Date(stats.timestamp).toLocaleTimeString(),
        vmId: stats.vmId,
        cpu: stats.cpuUsage,
        mem: stats.memUsage
      };

      // Keep last 20 logs
      setLogs((prev) => [...prev, newLog].slice(-20));
    });

    return () => {
      socket.off("systemUpdate");
    };
  }, []);

  return (
    <div id="event-logs">
      <h2>Event Logs</h2>
      {logs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>VM ID</th>
              <th>CPU Usage (%)</th>
              <th>Memory Usage (%)</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, idx) => (
              <tr key={idx}>
                <td>{log.timestamp}</td>
                <td>{log.vmId}</td>
                <td>{log.cpu}</td>
                <td>{log.mem}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Waiting for realtime events...</p>
      )}
    </div>
  );
}
