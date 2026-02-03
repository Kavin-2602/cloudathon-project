import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CloudVMPanel() {
  const [vms, setVMs] = useState([]);

  // Fetch running VMs
  useEffect(() => {
    const fetchVMs = async () => {
      try {
        const res = await fetch("http://localhost:3000/vms/list");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setVMs(data.vms || []);
      } catch (err) {
        console.error("Failed to fetch VMs", err);
        toast.error("⚠️ Failed to fetch VM list");
      }
    };
    fetchVMs();
    const interval = setInterval(fetchVMs, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  // Shutdown VM
  const shutdownVM = async (vmId) => {
    try {
      const res = await fetch(`http://localhost:3000/vms/shutdown/${vmId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }, // ✅ ensure JSON response
      });

      if (!res.ok) {
        const text = await res.text(); // capture error page if not JSON
        throw new Error(`HTTP ${res.status}: ${text}`);
      }

      const data = await res.json();
      if (data.success) {
        toast.success(`✅ VM ${vmId} shutdown approved`);
        setVMs((prev) =>
          prev.map((vm) =>
            vm.id === vmId ? { ...vm, status: "Shutting down..." } : vm
          )
        );
      } else {
        toast.error(`❌ Failed to shutdown VM ${vmId}`);
      }
    } catch (err) {
      console.error("Shutdown failed", err);
      toast.error("⚠️ Shutdown request failed");
    }
  };

  return (
    <div id="cloud-vm-panel" className="panel">
      <h3>Idle Cloud Resources</h3>
      {vms && vms.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>VM ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {vms.map((vm) => (
              <tr key={vm.id}>
                <td>{vm.id}</td>
                <td
                  style={{
                    color:
                      vm.status === "Shutting down..."
                        ? "orange"
                        : "green",
                  }}
                >
                  {vm.status}
                </td>
                <td>
                  <button onClick={() => shutdownVM(vm.id)}>
                    Approve Shutdown
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>✅ No running VMs detected</p>
      )}
    </div>
  );
}
