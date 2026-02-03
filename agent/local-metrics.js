const os = require("os");
const { io } = require("socket.io-client");

const socket = io("http://localhost:3000");
const vmId = os.hostname();

function getCpuUsage() {
  const cpus = os.cpus();
  let idle = 0, total = 0;

  cpus.forEach((core) => {
    for (let type in core.times) {
      total += core.times[type];
    }
    idle += core.times.idle;
  });

  return 100 - Math.floor((idle / total) * 100);
}

function getMemoryUsage() {
  const total = os.totalmem();
  const free = os.freemem();
  return Math.floor(((total - free) / total) * 100);
}

setInterval(() => {
  const cpu = getCpuUsage();
  const memory = getMemoryUsage();

  socket.emit("metrics", { vmId, cpu, memory });
  console.log(`📡 Sent: CPU ${cpu}%, Memory ${memory}%`);
}, 5000);
