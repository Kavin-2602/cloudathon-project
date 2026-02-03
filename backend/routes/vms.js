const express = require("express");
const { exec } = require("child_process");
const { listRunningVMs } = require("../vmStats");

const router = express.Router();

// List running VMs
router.get("/list", (req, res) => {
  listRunningVMs((err, vms) => {
    if (err) {
      console.error("Error listing VMs:", err);
      return res.status(500).json({ error: "Failed to list VMs" });
    }
    res.json({ vms });
  });
});

// Shutdown VM (using full path to VBoxManage.exe for Windows reliability)
router.post("/shutdown/:vmName", (req, res) => {
  const vmName = req.params.vmName;
  console.log(`⚡ Shutdown request received for VM: ${vmName}`);

  // ✅ Use full path to VBoxManage.exe
  const vboxPath = `"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe"`;

  exec(`${vboxPath} controlvm "${vmName}" poweroff`, (err, stdout, stderr) => {
    if (err) {
      console.error("❌ Shutdown failed:", err.message, stderr);
      return res.status(500).json({ success: false, error: err.message });
    }

    console.log(`✅ VM ${vmName} powered off successfully`);
    res.json({ success: true, vm: vmName });
  });
});

module.exports = router;
