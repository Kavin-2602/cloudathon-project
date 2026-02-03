const { exec } = require("child_process");

function listRunningVMs(callback) {
  exec('"C:\\Program Files\\Oracle\\VirtualBox\\VBoxManage.exe" list runningvms', (err, stdout) => {
    if (err) {
      console.error("VBoxManage error:", err.message);
      return callback(null, []);
    }

    const vms = stdout
      .trim()
      .split("\n")
      .filter(line => line)
      .map(line => {
        const match = line.match(/"(.+)" \{(.+)\}/);
        if (!match) return null;
        return { id: match[1], uuid: match[2], status: "Running" };
      })
      .filter(Boolean);

    callback(null, vms);
  });
}

module.exports = { listRunningVMs };
